<template>
    <div class="relative flex" :class="{
        'mt-[0px]': cardsInGraveyard === 1,
        'mt-[2px]': cardsInGraveyard === 2,
        'mt-[4px]': cardsInGraveyard === 3,
        'mt-[6px]': cardsInGraveyard === 4,
        'mt-[8px]': cardsInGraveyard === 5,
        'mt-[10px]': cardsInGraveyard === 6,
        'mt-[12px]': cardsInGraveyard === 7,
        'mt-[14px]': cardsInGraveyard === 8,
        'mt-[16px]': cardsInGraveyard === 9,
        'mt-[18px]': cardsInGraveyard >= 10,
    }">
        <div class="relative" @mouseenter="hovering = true" @mouseleave="hovering = false">
            <div v-show="hovering" v-if="cardsInGraveyard > 0"
                class="absolute top-0 left-0 z-50 flex flex-col justify-center w-full h-full bg-black rounded-lg cursor-pointer opacity-80"
                :class="{
                    '-mt-[0px]': cardsInGraveyard === 1,
                    '-mt-[2px]': cardsInGraveyard === 2,
                    '-mt-[4px]': cardsInGraveyard === 3,
                    '-mt-[6px]': cardsInGraveyard === 4,
                    '-mt-[8px]': cardsInGraveyard === 5,
                    '-mt-[10px]': cardsInGraveyard === 6,
                    '-mt-[12px]': cardsInGraveyard === 7,
                    '-mt-[14px]': cardsInGraveyard === 8,
                    '-mt-[16px]': cardsInGraveyard === 9,
                    '-mt-[18px]': cardsInGraveyard >= 10,
                }">
                <span class="p-2 text-center text-gray-400 hover:text-white">
                    Show Contents
                </span>
            </div>

            <img src="/img/emptyzone.png" class="flex w-48" />

            <img v-for="x in (cardsInGraveyard > 10 ? 10 : cardsInGraveyard)" :key="x" src="/img/cardback.png"
                class="absolute z-10 w-48" :class="{
                    '-top-[0px]': x === 1,
                    '-top-[2px]': x === 2,
                    '-top-[4px]': x === 3,
                    '-top-[6px]': x === 4,
                    '-top-[8px]': x === 5,
                    '-top-[10px]': x === 6,
                    '-top-[12px]': x === 7,
                    '-top-[14px]': x === 8,
                    '-top-[16px]': x === 9,
                    '-top-[18px]': x >= 10,
                }" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Graveyard",

    data: () => ({
        hovering: false,
        cards: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
    }),

    computed: {
        cardsInGraveyard() {
            return 0;
            return this.cards.length;
        }
    }
}
</script>