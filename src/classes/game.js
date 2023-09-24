import { getCurrentInstance } from 'vue';
import Horde from '../opponents/horde.js';
import PseudoStack from '../classes/pseudo-stack';

export default class Game {
    title = null;
    currentTurn = null;
    currentPhase = null;
    opponent = null;
    started = false;
    isOpponentTurn = false;
    firstPlayerChosen = false;
    eventsBus = null;
    stack = null;

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
        this.eventsBus = getCurrentInstance().appContext.config.globalProperties.$events;
        this.setTitle(game);
        this.setOpponent(game);
        this.stack = new PseudoStack();
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
        this.eventsBus.emit('game-started', {
            game: this,
        });
        this.opponent.setupStartingBoardState();
    }

    setPlayerFirstAndStart(first) {
        this.firstPlayerChosen = true;
        this.isOpponentTurn = !first;
        this.currentTurn = 0;

        if (!first) {
            this.startOpponentTurn();
        }
    }

    startOpponentTurn() {
        this.currentTurn++;
        // Untap step
        this.opponent.boardState.forEach(card => {
            card.tapped = false;

            if (card.handlers.untap.length) {
                card.handlers.untap.forEach(handler => {
                    handler();
                });
            }
        });

        // Upkeep step
        this.opponent.boardState.forEach(card => {
            if (card.handlers.upkeep.length) {
                card.handlers.upkeep.forEach(handler => {
                    handler();
                });
            }
        });

        // Draw step
        this.opponent.boardState.forEach(card => {
            if (card.handlers.draw.length) {
                card.handlers.draw.forEach(handler => {
                    handler();
                });
            }
        });

        // Main phase 1
        this.opponent.boardState.forEach(card => {
            if (card.handlers.main1.length) {
                card.handlers.main1.forEach(handler => {
                    handler();
                });
            }
        });

        this.opponent.handleMainPhase1();

        // Move to combat phase
        this.eventsBus.emit('pre-combat-main-phase-complete');
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