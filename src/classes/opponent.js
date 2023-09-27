import { getCurrentInstance } from "vue";

export default class Opponent {
    library = [];
    graveyard = [];
    exile = [];

    boardState = [];
    phaseHandlers = {
        untap: [],
        upkeep: [],
        draw: [],
        combatStart: [],
        combatEnd: [],
        main: [],
        end: [],
    };
    nonPermanentsPlayed = [];

    eventsBus = null;
    alerts = null;

    debounce = null;

    constructor () {
        this.eventsBus = getCurrentInstance().appContext.config.globalProperties.$events;
        this.alerts = getCurrentInstance().appContext.config.globalProperties.$swal;

        this.library = [];
        this.setDecklist();
        this.setupEvents();
    }

    setupEvents() {
        let self = this;

        this.eventsBus.on('destroy-card', card => {
            this.destroyCard(card);
        });

        this.eventsBus.on('destroy-card-no-refresh', card => {
            this.destroyCard(card, false);
        })

        this.eventsBus.on('exile-card', card => {
            this.exileCard(card);
        });

        this.eventsBus.on('card-resolves', card => {
            self.castSpell(card);
        });

        this.eventsBus.on('card-countered', card => {
            self.counterSpell(card);
        });

        this.eventsBus.on('mill-cards', amount => {
            self.millCards(amount);
        });
    }

    castSpell(card) {
        if (card) {
            if (card.superTypes.includes('Sorcery') || card.superTypes.includes('Instant')) {
                this.nonPermanentsPlayed.push(card);

                if (card.handlers.cast.length > 0) {
                    card.handlers.cast.forEach(handler => handler.call());
                }

                this.graveyard.push(card);
            } else {
                this.boardState.push(card);

                if (card.handlers.enterTheBattlefield.length > 0) {
                    card.handlers.enterTheBattlefield.forEach(handler => handler.call());
                }
            }

            this.eventsBus.emit('refresh-state');
        }
    }

    counterSpell(card) {
        this.graveyard.push(card);

        if (card.handlers.enterGraveyard.length > 0) {
            card.handlers.enterGraveyard.forEach(handler => handler.call());
        }

        this.eventsBus.emit('refresh-state');
    }

    castTopSpellOfLibrary () {
        let card = this.library.shift();

        if (card) {
            this.eventsBus.emit('cast-card', card);
        }
    }

    millCards(amount) {
        let self = this;
        let cards = this.library.splice(0, amount);

        cards.forEach(card => {
            self.graveyard.push(card);
        });
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

    destroyCard(card, refresh = true) {
        let boardState = this.boardState;
        let boardStateCardIds = boardState.map(card => card.id);
        let index = boardStateCardIds.indexOf(card.id);

        if (index === -1) {
            if (refresh) {
                this.eventsBus.emit('refresh-state');
            }
            return;
        }

        this.graveyard.push(boardState[index]);

        boardState[index].handlers.enterGraveyard.forEach(handler => handler.call(this.boardState[index]));

        boardState.splice(index, 1);

        this.boardState = boardState;

        if (refresh) {
            this.eventsBus.emit('refresh-state');
        }
    }

    exileCard(card) {
        let boardState = this.boardState;
        let boardStateCardIds = boardState.map(card => card.id);
        let index = boardStateCardIds.indexOf(card.id);

        this.exile.push(boardState[index]);

        boardState.splice(index, 1);

        this.boardState = boardState;

        this.eventsBus.emit('refresh-state');
    }
}