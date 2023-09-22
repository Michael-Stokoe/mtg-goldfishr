<template>
    <div class="p-4 rounded-lg hover:bg-gray-800 hover:shadow-lg cursor-pointer flex flex-col space-y-2" @click="goToGame">
        <div>
            <img :src="image" class="rounded-lg w-96">
        </div>
        <span class="text-center text-2xl font-semibold">{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: "GameSelectionCard",

    props: [
        'title',
        'game',
        'image',
    ],

    data: () => ({

    }),

    methods: {
        goToGame() {
            this.$router.push({ name: 'game', params: { game: this.game } });
        }
    }
}
</script>