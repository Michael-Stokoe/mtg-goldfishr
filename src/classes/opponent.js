import { getCurrentInstance } from "vue";

export default class Opponent {
    library = [];
    graveyard = [];
    exile = [];

    boardState = null;
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
        this.eventsBus.on('destroy-card', card => {
            let boardState = this.boardState;
            let boardStateCardIds = boardState.map(card => card.id);
            let cardIndex = boardStateCardIds.indexOf(card.id);

            this.graveyard.push(boardState[cardIndex]);
            boardState.splice(cardIndex, 1);

            this.boardState = boardState;

            this.eventsBus.emit('refresh-board-state');
        });

        this.eventsBus.on('exile-card', card => {
            // let boardStateCardIds = this.boardState.map(card => card.id);
            // let cardIndex = boardStateCardIds.indexOf(card.id);
            // let cardObj = Object.assign({}, this.boardState[cardIndex]);

            // this.exile.push(cardObj);
            // this.boardState.splice(cardIndex, 1);
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
}