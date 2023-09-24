import { getCurrentInstance } from "vue";

export default class Card {
    name = null;
    superTypes = [];
    subTypes = [];
    manaCost = null;
    tapped = false;
    image = null;
    id = null;
    isAttacking = false;
    power = null;
    toughness = null;

    eventsBus = null;

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
        enterGraveyard: [],
        blocked: [],
        cast: [],
        death: [],
        tap: [],
    }

    constructor (name, superTypes, subTypes, manaCost, image, power, toughness) {
        this.name = name;
        this.superTypes = superTypes;
        this.subTypes = subTypes;
        this.manaCost = manaCost;
        this.image = image;
        this.id = Math.random().toString(36);
        this.power = power;
        this.toughness = toughness;

        this.eventsBus = getCurrentInstance().appContext.config.globalProperties.$events;

        // this.eventsBus.on('tap-card', card => {
        //     if (card && card.id === this.id) {
        //         card.tapped = true;
        //     }
        // });
    }

    cast() {
        // ...
    }

    counter() {
        // ...
    }
}