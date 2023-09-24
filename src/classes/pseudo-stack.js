import { getCurrentInstance } from "vue";

export default class PseudoStack {
    game = null;
    opponent = null;
    stack = [];
    eventsBus = null;

    constructor () {
        this.stack = [];

        this.eventsBus = getCurrentInstance().appContext.config.globalProperties.$events;

        this.eventsBus.on('game-started', gameParams => {
            this.game = gameParams.game;
            this.opponent = gameParams.game.opponent;
        });

        this.eventsBus.on('cast-card', card => {
            this.add(card);
        });

        this.eventsBus.on('current-card-resolves', resolves => {
            if (resolves) {
                this.resolve();
            } else {
                this.counter();
            }
        });
    }

    add (card) {
        this.stack.push(card);
    }

    resolve () {
        let card = this.stack.pop();

        if (card) {
            card.cast();
        }
    }

    counter () {
        let card = this.stack.pop();

        if (card) {
            card.counter();
        }
    }

    resolveAll () {
        while (this.stack.length > 0) {
            this.resolve();
        }
    }

    getStack () {
        return this.stack;
    }
}