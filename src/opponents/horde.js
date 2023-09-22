import decklist from '../decklists/horde.json';
import Opponent from '../classes/opponent.js';
import Card from '../classes/card.js';

export default class Horde extends Opponent {
    constructor () {
        super();
    }

    setDecklist () {
        let self = this;
        decklist.forEach(function (card) {
            for (var i = 0; i < card.count; i++) {
                let newCard = new Card(card.name, card.superTypes, card.subTypes, 0);

                self.applyCardHandlers(newCard);

                self.library.push(newCard);
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