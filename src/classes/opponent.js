import { getCurrentInstance } from "vue";

export default class Opponent {
    game = null;

    library = [];
    graveyard = [];
    exile = [];

    boardState = [];
    combatStartHandlers = [];
    nonPermanentsPlayed = [];

    eventsBus = null;

    constructor () {
        this.eventsBus = getCurrentInstance().appContext.config.globalProperties.$events;
        this.library = [];
        this.setDecklist();
        this.setupEvents();
    }

    setupEvents() {
        let self = this;

        this.eventsBus.on('game-started', gameParams => {
            self.game = gameParams.game;
        });

        this.eventsBus.on('destroy-card', card => {
            let boardState = self.boardState;
            let boardStateCardIds = boardState.map(card => card.id);
            let cardIndex = boardStateCardIds.indexOf(card.id);

            self.graveyard.push(boardState[cardIndex]);
            boardState.splice(cardIndex, 1);

            self.boardState = boardState;

            self.eventsBus.emit('refresh-state');
        });

        this.eventsBus.on('exile-card', card => {
            let boardState = self.boardState;
            let boardStateCardIds = boardState.map(card => card.id);
            let cardIndex = boardStateCardIds.indexOf(card.id);

            self.exile.push(boardState[cardIndex]);
            boardState.splice(cardIndex, 1);

            self.boardState = boardState;

            self.eventsBus.emit('refresh-state');
        });

        this.eventsBus.on('card-resolves', card => {
            self.castSpell(card);
        });

        this.eventsBus.on('card-countered', card => {
            self.counterSpell(card);
        });
    }

    castSpell(card) {
        if (card) {
            if (card.superTypes.includes('Sorcery')) {
                this.combatStartHandlers.push(card);
                this.nonPermanentsPlayed.push(card);
            } else {
                this.boardState.push(card);

                if (card.handlers.enterTheBattlefield.length > 0) {
                    card.handlers.enterTheBattlefield.forEach(handler => handler.call(card));
                }
            }

            this.eventsBus.emit('refresh-state');
        }
    }

    counterSpell(card) {
        this.graveyard.push(card);

        if (card.handlers.enterGraveyard.length > 0) {
            card.handlers.enterGraveyard.forEach(handler => handler.call(card));
        }

        this.eventsBus.emit('refresh-state');
    }

    castTopSpellOfLibrary () {
        let card = this.library.shift();

        if (card) {
            this.eventsBus.emit('cast-card', card);
        }
    }

    shuffleLibrary () {
        let cards = Object.assign(this.library, []);

        for (var i = cards.length -1; i > 0; --i) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }

        this.library = cards;
    }
}