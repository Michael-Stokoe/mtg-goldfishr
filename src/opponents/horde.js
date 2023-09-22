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

    getOpponentRulesText () {
        return `
            <li>If you're playing a standard 40 card deck, play your first turn, then start the Horde's first turn.</li>
            <li>If you're playing a Commander/EDH deck, play out your first 3 turns, then start the Horde's first turn.</li>
            <li>From now, you should take it in turns as if you're playing a normal game.</li>
            <li>For an increased challenge, you can reduce the amount of setup turns you take, or allow the Horde to play first.</li>
            <li>You can also opt to not deal combat damage to the horde, and only win by playing out the game until the horde has no cards left.</li>
            <li>An orange arrow pointing down from a creature will indicate that it is tapped and attacking.</li>
            <li>When the Horde plays a sorcery, the card will appear on screen for a short time, and apply any of its effects to the Minotaurs.</li>
            <li>Attacking the Horde on your turn will put the top X cards of the Horde's library into its graveyard, X being the amount of damage dealt.</li>
            <li>The Horde has infinite mana, and you should assume all costs will be paid (Smothering Tithe, Rhystic Study, etc.).</li>
            <li>The Horde will ignore any effects that are impossible for it to perform, such as drawing or discarding cards.</li>
        `;
    }
}