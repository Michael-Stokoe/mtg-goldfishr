import hordeDecklist from './decklists/horde.json';

export class Game {
    title = null;
    currentTurn = null;
    currentPhase = null;
    decklist = null;

    phases = [
        'untap',
        'upkeep',
        'draw',
        'main1',
        'combat',
        'main2',
        'end',
    ];
    
    constructor (type) {
        this.setTitle(type);
        this.getDecklist(type);
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

    getDecklist (game) {
        let library = [];
        
        let decklist = hordeDecklist;

        decklist.forEach((card) => {
            for (var i = 0; i < card.count; i++) {
                let newCard = new Card(card.name, card.superTypes, card.subTypes, 0);

                this.applyCardHandlers(newCard);

                library.push(newCard);
            }
        });
    }

    applyCardHandlers (card) {
        if (card.name === 'Mogis\'s Chosen') {
            card.onEnterTheBattleField = function () {
                this.tapped = true;
            }
        }

        if (card.name === 'Reckless Minotaur') {
            card.onEndStep = function () {
                this.kill();
            }
        }

        if (card.name === 'Consuming Rage') {
            card.handlers.cast = function () {
                // whenever a minotaur attacks this turn,
                // it gets +2/+0 until end of turn.
                // destroy that creature at the end of combat.
            }
        }

        if (card.name === 'Descend on the Prey') {
            card.handlers.cast = function () {
                // Whenever a minotaur attacks this turn, it gains
                // first strike and must be block this turn if able.
            }
        }

        if (card.name === 'Intervention of Keranos') {
            card.handlers.cast = function () {
                // At the beginning of combat this turn,
                // Intervention of Keranos deals 3 damage to each creature.
            }
        }

        if (card.name === 'Touch of the Horned God') {
            card.handlers.cast = function () {
                // Whenever a minotaur attacks this turn, it gains
                // deathtouch until end of turn.
            }
        }

        if (card.name === 'Unquenchable Fury') {
            card.handlers.cast = function () {
                // Each Minotaur can't be blocked this turn except by two or more creatures.
            }
        }

        if (card.name === 'Altar of Mogis') {
            card.handlers.main1 = function () {
                // At the beginning of the horde's precombat main phase,
                // reveal an additional card from the top of the horde's library.
                // The horde casts that card.
            }

            card.handlers.death = function () {
                // The horde sacrifices two Minotaurs.
            }
        }

        if (card.name === 'Massacre Totem') {
            card.handlers.main1 = function () {
                // At the beginning of the horde's precombat main phase,
                // reveal an additional card from the top of the horde's library.
                // The horde casts that card.
            }

            card.handlers.death = function () {
                // The horde mills 7 cards
            }
        }

        if (card.name === 'Plundered Statue') {
            card.handlers.main1 = function () {
                // At the beginning of the horde's precombat main phase,
                // reveal an additional card from the top of the horde's library.
                // The horde casts that card.
            }

            card.handlers.death = function () {
                // Each player draws a card
            }
        }

        if (card.name === 'Refreshing Elixir') {
            card.handlers.main1 = function () {
                // At the beginning of the horde's precombat main phase,
                // reveal an additional card from the top of the horde's library.
                // The horde casts that card.
            }

            card.handlers.death = function () {
                // Each player gains 5 life.
            }
        }

        if (card.name === 'Vitality Salve') {
            card.handlers.main1 = function () {
                // At the beginning of the horde's precombat main phase,
                // reveal an additional card from the top of the horde's library.
                // The horde casts that card.
            }

            card.handlers.death = function () {
                // Each player returns a creature card from their graveyard to the battlefield.
            }
        }
    }
}

export class Card {
    name = null;
    superTypes = [];
    subTypes = [];
    manaCost = null;
    tapped = false;

    handlers = {
        untap: null,
        upkeep: null,
        draw: null,
        main1: null,
        combat: {
            beginning: null,
            declareAttackers: null,
            declareBlockers: null,
            combatDamage: null,
            end: null,
        },
        main2: null,
        end: null,

        attack: null,
        enterTheBattlefield: null,
        leaveTheBattlefield: null,
        blocked: null,
        cast: null,
        death: null,
        tap: null,
        upkeep: null,
        preCombatMainPhase: null,
        postCombatMainPhase: null,
        endStep: null,
    }

    constructor (name, superTypes, subTypes, manaCost) {
        this.name = name;
        this.superTypes = superTypes;
        this.subTypes = subTypes;
        this.manaCost = manaCost;
    }

    kill () {
        // send card to graveyard
    }
}

export default {
    Game,
    Card,
}