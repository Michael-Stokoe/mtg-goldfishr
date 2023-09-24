<template>
    <div class="relative flex" :class="{
        'mt-[0px]': cardsInExile === 1,
        'mt-[2px]': cardsInExile === 2,
        'mt-[4px]': cardsInExile === 3,
        'mt-[6px]': cardsInExile === 4,
        'mt-[8px]': cardsInExile === 5,
        'mt-[10px]': cardsInExile === 6,
        'mt-[12px]': cardsInExile === 7,
        'mt-[14px]': cardsInExile === 8,
        'mt-[16px]': cardsInExile === 9,
        'mt-[18px]': cardsInExile >= 10,
    }">
        <div class="relative" @mouseenter="hovering = true" @mouseleave="hovering = false">
            <div v-show="hovering" v-if="cardsInExile > 0"
                class="absolute top-0 left-0 z-50 flex flex-col justify-center w-full h-full bg-black rounded-lg cursor-pointer opacity-80"
                :class="{
                    '-mt-[0px]': cardsInExile === 1,
                    '-mt-[2px]': cardsInExile === 2,
                    '-mt-[4px]': cardsInExile === 3,
                    '-mt-[6px]': cardsInExile === 4,
                    '-mt-[8px]': cardsInExile === 5,
                    '-mt-[10px]': cardsInExile === 6,
                    '-mt-[12px]': cardsInExile === 7,
                    '-mt-[14px]': cardsInExile === 8,
                    '-mt-[16px]': cardsInExile === 9,
                    '-mt-[18px]': cardsInExile >= 10,
                }">
                <span class="p-2 text-center text-gray-400 hover:text-white">
                    Show Contents
                </span>
            </div>

            <img src="/img/emptyzone.png" class="flex w-48" />

            <img v-for="(card, index) in exile" :key="card.id" :src="card.image" class="absolute z-10 w-48 rounded-xl"
                :class="{
                    '-top-[0px]': index === 0,
                    '-top-[2px]': index === 1,
                    '-top-[4px]': index === 2,
                    '-top-[6px]': index === 3,
                    '-top-[8px]': index === 4,
                    '-top-[10px]': index === 5,
                    '-top-[12px]': index === 6,
                    '-top-[14px]': index === 7,
                    '-top-[16px]': index === 8,
                    '-top-[18px]': index >= 9,
                }" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Exile",

    props: [
        'exile',
    ],

    data: () => ({
        hovering: false,
    }),

    computed: {
        cardsInExile() {
            return this.exile.length;
        },

        exileRenderer() {
            if (this.cardsInExile > 10) {
                return this.exile.slice(0, 10);
            }
            return this.exile;
        }
    }
}
</script>