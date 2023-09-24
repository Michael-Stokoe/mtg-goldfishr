<template>
    <div class="relative flex" :class="{
        'mt-[0px]': cardsInLibrary === 1,
        'mt-[2px]': cardsInLibrary === 2,
        'mt-[4px]': cardsInLibrary === 3,
        'mt-[6px]': cardsInLibrary === 4,
        'mt-[8px]': cardsInLibrary === 5,
        'mt-[10px]': cardsInLibrary === 6,
        'mt-[12px]': cardsInLibrary === 7,
        'mt-[14px]': cardsInLibrary === 8,
        'mt-[16px]': cardsInLibrary === 9,
        'mt-[18px]': cardsInLibrary >= 10,
    }">
        <div class="relative" @mouseenter="hovering = true" @mouseleave="hovering = false">
            <div v-show="hovering" v-if="cardsInLibrary > 0" :class="{
                '-mt-[0px]': cardsInLibrary === 1,
                '-mt-[2px]': cardsInLibrary === 2,
                '-mt-[4px]': cardsInLibrary === 3,
                '-mt-[6px]': cardsInLibrary === 4,
                '-mt-[8px]': cardsInLibrary === 5,
                '-mt-[10px]': cardsInLibrary === 6,
                '-mt-[12px]': cardsInLibrary === 7,
                '-mt-[14px]': cardsInLibrary === 8,
                '-mt-[16px]': cardsInLibrary === 9,
                '-mt-[18px]': cardsInLibrary >= 10,
            }"
                class="absolute top-0 left-0 z-50 flex flex-col justify-center w-full h-full bg-black rounded-lg cursor-pointer opacity-80">
                <span class="p-2 text-center text-gray-400 hover:text-white">
                    Mill X Cards
                </span>
                <span class="p-2 text-center text-gray-400 hover:text-white">
                    Reveal X Cards
                </span>
            </div>

            <img src="/img/emptyzone.png" class="flex w-48" />

            <img v-if="cardsInLibrary > 0" v-for="(card, index) in libraryRenderer" :key="card.id" src="/img/cardback.png"
                class="absolute z-10 w-48" :class="{
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
    name: "Library",

    props: [
        'library',
    ],

    mounted() {
        this.$events.on('refresh-state', () => {
            this.refreshKey++;
        });
    },

    unmounted() {
        this.$events.off('refresh-state');
    },

    data: () => ({
        refreshKey: 0,
        hovering: false,
    }),

    methods: {},

    computed: {
        cardsInLibrary() {
            return this.library.length;
        },

        libraryRenderer() {
            if (this.cardsInLibrary > 10) {
                return this.library.slice(0, 10);
            }
            return this.library;
        }
    }
}
</script>