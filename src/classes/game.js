import Horde from '../opponents/horde.js'

export default class Game {
    title = null;
    currentTurn = null;
    currentPhase = null;
    opponent = null;

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
}