export default class Card {
    name = null;
    superTypes = [];
    subTypes = [];
    manaCost = null;
    tapped = false;
    image = null;
    id = null;

    permanentCardTypes = [
        'artifact',
        'creature',
        'enchantment',
        'land',
        'planeswalker',
    ];

    nonPermanentCardTypes = [
        'instant',
        'sorcery',
    ];

    handlers = {
        untap: [],
        upkeep: [],
        draw: [],
        main1: [],
        combat: {
            beginning: [],
            declareAttackers: [],
            declareBlockers: [],
            combatDamage: [],
            end: [],
        },
        main2: [],
        end: [],

        attack: [],
        enterTheBattlefield: [],
        leaveTheBattlefield: [],
        blocked: [],
        cast: [],
        death: [],
        tap: [],
    }

    constructor (name, superTypes, subTypes, manaCost, image) {
        this.name = name;
        this.superTypes = superTypes;
        this.subTypes = subTypes;
        this.manaCost = manaCost;
        this.image = image;
        this.id = Math.random().toString(36);
    }

    kill () {
        // send card to graveyard
    }
}