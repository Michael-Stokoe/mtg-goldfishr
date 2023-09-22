export default class Card {
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