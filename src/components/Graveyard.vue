<template>
    <div class="relative flex" :class="{
        'mt-[0px]': graveyard.length === 1,
        'mt-[2px]': graveyard.length === 2,
        'mt-[4px]': graveyard.length === 3,
        'mt-[6px]': graveyard.length === 4,
        'mt-[8px]': graveyard.length === 5,
        'mt-[10px]': graveyard.length === 6,
        'mt-[12px]': graveyard.length === 7,
        'mt-[14px]': graveyard.length === 8,
        'mt-[16px]': graveyard.length === 9,
        'mt-[18px]': graveyard.length >= 10,
    }">
        <div class="relative" @mouseenter="hovering = true" @mouseleave="hovering = false">
            <div v-show="hovering" v-if="graveyard.length > 0"
                class="absolute top-0 left-0 z-50 flex flex-col justify-center w-full h-full bg-black rounded-lg cursor-pointer opacity-80"
                :class="{
                    '-mt-[0px]': graveyard.length === 1,
                    '-mt-[2px]': graveyard.length === 2,
                    '-mt-[4px]': graveyard.length === 3,
                    '-mt-[6px]': graveyard.length === 4,
                    '-mt-[8px]': graveyard.length === 5,
                    '-mt-[10px]': graveyard.length === 6,
                    '-mt-[12px]': graveyard.length === 7,
                    '-mt-[14px]': graveyard.length === 8,
                    '-mt-[16px]': graveyard.length === 9,
                    '-mt-[18px]': graveyard.length >= 10,
                }">
                <span class="p-2 text-center text-gray-400 hover:text-white">
                    Show Contents
                </span>
            </div>

            <img src="/img/emptyzone.png" class="flex w-48" />

            <img v-for="(card, index) in graveyard" :key="card.id" :src="card.image" class="absolute z-10 w-48 rounded-xl"
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
    name: "Graveyard",

    props: [
        'graveyard',
    ],

    mounted() {
        // this.$events.on('refresh-state', () => {
        //     this.refreshKey++;
        // });
    },

    unmounted() {
        // this.$events.off('refresh-state');
    },

    data: () => ({
        refreshKey: 0,
        hovering: false,
    }),

    computed: {
        graveyardRenderer() {
            if (this.graveyard.length > 10) {
                return this.graveyard.slice(0, 10);
            }
            return this.graveyard;
        }
    }
}
</script>