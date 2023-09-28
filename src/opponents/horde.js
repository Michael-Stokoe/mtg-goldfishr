import decklist from '../decklists/horde.json';
import Opponent from '../classes/opponent.js';
import Card from '../classes/card.js';

export default class Horde extends Opponent {
    constructor () {
        super();

        this.eventsBus.on('blockers-declared', () => {
            this.handleBlockersDeclared();
        });
    }

    setDecklist () {
        let self = this;
        decklist.forEach(function (card) {
            for (var i = 0; i < card.count; i++) {
                let newCard = new Card(card.name, card.superTypes, card.subTypes, 0, card.image, card.power, card.toughness, card.ranking);

                self.applyCardHandlers(newCard);

                self.library.push(newCard);
            }
        });

        this.shuffleLibrary();
    }

    setupStartingBoardState () {
        this.boardState = [];
    }

    handleMainPhase1 () {
        this.castTopSpellOfLibrary();
        this.castTopSpellOfLibrary();

        // for (var i = 0; i < 10; i++) {
        //     this.castTopSpellOfLibrary();
        // }
    }

    handleCombat() {
        this.nonPermanentsPlayed.forEach(card => {
            card.handlers.combat.beginning.forEach(handler => handler.call());
            card.handlers.combat.declareAttackers.forEach(handler => handler.call());
        });

        // declare attackers
        this.boardState.forEach(card => {
            if (card.superTypes.includes('Creature')) {
                if (!card.tapped) {
                    card.declareAsAttacker();

                    card.handlers.combat.beginning.forEach(handler => handler.call());
                    card.handlers.combat.declareAttackers.forEach(handler => handler.call());
                }
            }
        });


        // wait for declare blockers
        this.waitingForDeclareBlockers = true;
        this.alerts('The Horde is attacking!', 'Declare your blocks by clicking either "Block" or "Lethal Block". Attacking creatures are highlighted red.', 'info');
    }

    handleBlockersDeclared() {
        this.boardState.forEach(card => {
            if (card.isAttacking) {
                card.handlers.combat.declareBlockers.forEach(handler => handler.call());

                if (card.isBlockedAndDying) {
                    this.eventsBus.emit('destroy-card', card);
                }

                if (!card.isBlocked && !card.isBlockedAndDying) {
                    this.eventsBus.emit('lose-life', card.power);
                }
            }
        });

        // Move to combat cleanup phase

        this.waitingForDeclareBlockers = false;

        this.boardState.forEach(card => {
            card.handlers.combat.end.forEach(handler => handler.call());
        });

        let cardsToDestroy = this.boardState.filter(card => card.destroyAfterCombat).map(card => card.id);
        cardsToDestroy.forEach(id => {
            this.destroyCard(this.boardState.find(card => card.id === id));
        });

        // this.game.currentPhase = 'end';
        this.eventsBus.emit('set-phase', 'end');
        this.eventsBus.emit('refresh-state');
        this.handleEndStep();
    }

    handleEndStep() {
        this.boardState.forEach(card => {
            card.isAttacking = false;
            card.isBlocked = false;
            card.isBlockedAndDying = false;

            card.handlers.end.forEach(handler => handler.call());
        });

        this.nonPermanentsPlayed = [];

        this.eventsBus.emit('refresh-state');
        this.eventsBus.emit('waiting-to-start-player-turn');
    }

    applyCardHandlers (card) {
        var self = this;

        if (card.name === "Mogis's Chosen") {
            card.handlers.enterTheBattlefield.push(function () {
                card.tapped = true;
            });
        }

        if (card.name === 'Reckless Minotaur') {
            card.handlers.end.push(function () {
                self.eventsBus.emit('destroy-card', card);
            });
        }

        if (card.name === 'Consuming Rage') {
            card.handlers.combat.beginning.push(function () {
                // whenever a minotaur attacks this turn,
                // it gets +2/+0 until end of turn.
                // destroy that creature at the end of combat.

                self.boardState.forEach(card => {
                    if (card.superTypes.includes('Creature')) {
                        card.power += 2;
                        card.destroyAfterCombat = true;
                        self.eventsBus.emit('refresh-state');
                    }
                });
            });
        }

        if (card.name === 'Descend on the Prey') {
            card.handlers.combat.beginning.push(function () {
                // Whenever a minotaur attacks this turn, it gains
                // first strike and must be blocked this turn if able. 

                self.boardState.forEach(card => {
                    if (card.superTypes.includes('Creature')) {
                        card.abilities.push('First Strike');

                        card.handlers.combat.end.push(function () {
                            card.abilities = card.abilities.filter(ability => ability !== 'First Strike');
                        });
                    }
                });
            });
        }

        if (card.name === 'Intervention of Keranos') {
            card.handlers.combat.beginning.push(function () {
                // At the beginning of combat this turn,
                // Intervention of Keranos deals 3 damage to each creature.

                self.boardState.forEach(card => {
                    if (card.superTypes.includes('Creature')) {
                        card.damage += 3;
                        card.handlers.end.push(function () {
                            card.damage -= 3;
                        });
                    }
                });
            });
        }

        if (card.name === 'Touch of the Horned God') {
            card.handlers.combat.beginning.push(function () {
                // Whenever a minotaur attacks this turn, it gains
                // deathtouch until end of turn.

                self.boardState.forEach(card => {
                    if (card.superTypes.includes('Creature')) {
                        card.abilities.push('Deathtouch');
                        self.eventsBus.emit('refresh-state');

                        card.handlers.combat.end.push(function () {
                            card.abilities = card.abilities.filter(ability => ability !== 'Deathtouch');
                        });
                    }
                });
            });
        }

        if (card.name === 'Unquenchable Fury') {
            card.handlers.combat.beginning.push(function () {
                // Each Minotaur can't be blocked this turn except by two or more creatures.

                self.boardState.forEach(card => {
                    if (card.superTypes.includes('Creature')) {
                        card.abilities.push('Menace');

                        card.handlers.combat.end.push(function () {
                            card.abilities = card.abilities.filter(ability => ability !== 'Menace');
                        });
                    }
                });
            });
        }

        if (card.name === 'Altar of Mogis') {
            card.handlers.main1.push(function () {
                self.castTopSpellOfLibrary();
            });

            let creatures = [];

            card.handlers.enterGraveyard.push(function () {
                // The horde sacrifices two Minotaurs.
                self.boardState.forEach(card => {
                    if (card.subTypes.includes('Minotaur')) {
                        creatures.push(card);
                    }
                });
            });

            // sort the toSort array by card.ranking in ascending order
            creatures.sort(function (a, b) {
                return a.ranking - b.ranking;
            });

            // destroy the first two cards in the array
            if (creatures.length > 0) this.destroyCard(creatures[0]);
            if (creatures.length > 1) this.destroyCard(creatures[1]);
        }

        if (card.name === 'Massacre Totem') {
            card.handlers.main1.push(function () {
                self.castTopSpellOfLibrary();
            });

            card.handlers.enterGraveyard.push(function () {
                // The horde mills 7 cards
                self.eventsBus.emit('mill-cards', 7);
            });
        }

        if (card.name === 'Plundered Statue') {
            card.handlers.main1.push(function () {
                self.castTopSpellOfLibrary();
            });

            card.handlers.enterGraveyard.push(function () {
                // Each player draws a card
                self.alerts('Plundered Statue put into graveyard', 'Each player draws a card', 'info');
            });
        }

        if (card.name === 'Refreshing Elixir') {
            card.handlers.main1.push(function () {
                self.castTopSpellOfLibrary();
            });

            card.handlers.enterGraveyard.push(function () {
                self.eventsBus.emit('gain-life', 5);
            });
        }

        if (card.name === 'Vitality Salve') {
            let self = this;
            card.handlers.main1.push(function () {
                self.castTopSpellOfLibrary();
            });

            card.handlers.enterGraveyard.push(function () {
                // Each player returns a creature card from their graveyard to the battlefield.
                self.alerts('Vitality Salve put into graveyard', 'Each player returns a creature card from their graveyard to the battlefield', 'info');
            });
        }
    }

    getOpponentRulesText () {
        return `
            <li>If you're playing a standard 60 card deck, play your first turn, then start the Horde's first turn.</li>
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
