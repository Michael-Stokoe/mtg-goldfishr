import { getCurrentInstance } from "vue";

export default class PseudoStack {
    game = null;
    opponent = null;
    stack = [];
    eventsBus = null;
    alerts = null;

    autoResolveSpells = true;

    constructor () {
        this.stack = [];

        this.eventsBus = getCurrentInstance().appContext.config.globalProperties.$events;
        this.alerts = getCurrentInstance().appContext.config.globalProperties.$swal;

        this.eventsBus.on('game-started', gameParams => {
            this.game = gameParams.game;
            this.opponent = gameParams.game.opponent;
        });

        this.eventsBus.on('toggle-auto-resolve', autoResolve => this.autoResolveSpells = autoResolve);

        this.eventsBus.on('cast-card', card => {
            this.add(card);

            if (this.autoResolveSpells) {
                this.resolve();
            }
        });

        this.eventsBus.on('current-card-resolves', resolves => {
            resolves ? this.resolve() : this.counter();
        });
    }

    add (card) {
        this.stack.push(card);
    }

    resolve () {
        let card = this.stack.splice(0,1)[0];

        this.eventsBus.emit('card-resolves', card);
    }

    counter () {
        let card = this.stack.splice(0,1)[0];

        this.eventsBus.emit('card-countered', card);
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