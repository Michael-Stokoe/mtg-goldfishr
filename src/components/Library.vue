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

            <img v-for="x in (cardsInLibrary > 10 ? 10 : cardsInLibrary)" :key="x" src="/img/cardback.png"
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
    name: "Library",

    props: [
        'library',
    ],

    data: () => ({
        hovering: false,
    }),

    computed: {
        cardsInLibrary() {
            return this.library.length;
        },
    }
}
</script>