<template>
    <div class="relative flex" :class="{
        'mt-[0px]': exile.length === 1,
        'mt-[2px]': exile.length === 2,
        'mt-[4px]': exile.length === 3,
        'mt-[6px]': exile.length === 4,
        'mt-[8px]': exile.length === 5,
        'mt-[10px]': exile.length === 6,
        'mt-[12px]': exile.length === 7,
        'mt-[14px]': exile.length === 8,
        'mt-[16px]': exile.length === 9,
        'mt-[18px]': exile.length >= 10,
    }">
        <div class="relative" @mouseenter="hovering = true" @mouseleave="hovering = false">
            <div v-show="hovering" v-if="exile.length > 0"
                class="absolute top-0 left-0 z-50 flex flex-col justify-center w-full h-full bg-black rounded-lg cursor-pointer opacity-80"
                :class="{
                    '-mt-[0px]': exile.length === 1,
                    '-mt-[2px]': exile.length === 2,
                    '-mt-[4px]': exile.length === 3,
                    '-mt-[6px]': exile.length === 4,
                    '-mt-[8px]': exile.length === 5,
                    '-mt-[10px]': exile.length === 6,
                    '-mt-[12px]': exile.length === 7,
                    '-mt-[14px]': exile.length === 8,
                    '-mt-[16px]': exile.length === 9,
                    '-mt-[18px]': exile.length >= 10,
                }">
                <span class="p-2 text-center text-gray-400 hover:text-white">
                    Show Contents
                </span>
            </div>

            <img src="/img/emptyzone.png" class="flex w-48" />

            <img v-for="(card, index) in exileRenderer" :key="card.id" :src="card.image"
                class="absolute z-10 w-48 rounded-xl" :class="{
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

    mounted() {
        this.$events.on('refresh-state', () => this.refreshKey++);
    },

    unmounted() {
        this.$events.off('refresh-state');
    },

    data: () => ({
        refreshKey: 0,
        hovering: false,
    }),

    computed: {
        exileRenderer() {
            this.refreshKey;

            if (this.exile.length > 10) {
                let items = Object.assign([], this.exile);
                return items.slice(-10);
            }

            return this.exile;
        }
    }
}
</script>