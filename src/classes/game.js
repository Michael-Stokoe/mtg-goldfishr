import Horde from '../opponents/horde.js'

export default class Game {
    title = null;
    currentTurn = null;
    currentPhase = null;
    opponent = null;
    started = false;
    isOpponentTurn = false;
    firstPlayerChosen = false;

    phases = [
        'untap',
        'upkeep',
        'draw',
        'main1',
        'combat',
        'main2',
        'end',
    ];

    constructor (game) {
        this.setTitle(game);
        this.setOpponent(game);
    }

    setTitle (game) {
        switch (game) {
            case 'minotaur':
                this.title = 'Battle the Horde';
                break;
            case 'hydra':
                this.title = 'Face the Hydra';
                break;
            default:
                this.title = 'Unknown Game';
                throw new Error('Unknown game type');
                break;
        }
    }

    setOpponent (game) {
        switch (game) {
            case 'minotaur':
                this.opponent = new Horde();
                break;
            case 'hydra':
                // this.opponent = new Hydra();
                break;
            default:
                // this.opponent = 'Unknown Game';
                throw new Error('Unknown game type');
                break;
        }
    }

    getGameRulesText () {
        return this.opponent.getOpponentRulesText();
    }

    startGame () {
        this.started = true;
    }

    setPlayerFirstAndStart(first) {
        this.firstPlayerChosen = true;
        this.isOpponentTurn = !first;
        this.currentTurn = 1;

        if (!first) {
            this.startOpponentTurn();
        }
    }

    startOpponentTurn() {
        // ...
    }

    advancePhase () {
        let currentPhaseIndex = this.phases.indexOf(this.currentPhase);
        let nextPhaseIndex = currentPhaseIndex + 1;

        if (nextPhaseIndex > this.phases.length - 1) {
            nextPhaseIndex = 0;
        }

        this.currentPhase = this.phases[nextPhaseIndex];
    }
}