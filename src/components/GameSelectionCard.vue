<template>
    <div class="relative flex flex-col p-4 space-y-2 rounded-lg" :class="{
        'transition-transform duration-500 cursor-pointer hover:scale-105 hover:bg-gray-800 hover:shadow-lg': !disabled
    }" @click="goToGame">

        <div v-if="disabled"
            class="absolute z-50 p-2 px-4 text-white -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-full top-1/2 left-1/2">
            <span class="text-xl font-semibold">Coming Soon</span>
        </div>

        <div class="relative">
            <div v-if="disabled" class="absolute top-0 left-0 w-full h-full bg-black rounded-lg opacity-80"></div>
            <img :src="image" class="rounded-lg w-96">
        </div>
        <span class="text-2xl font-semibold text-center">{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: "GameSelectionCard",

    props: [
        'title',
        'game',
        'image',
        'disabled',
    ],

    data: () => ({

    }),

    methods: {
        goToGame() {
            if (this.disabled) return;
            this.$router.push({ name: 'game', params: { game: this.game } });
        }
    }
}
</script>