<template>
    <div class="container mx-auto flex flex-col space-y-6">
        <div class="py-6 text-center">
            <h1 class="text-white text-5xl font-semibold">{{ gameTitle }}</h1>
        </div>
    </div>
</template>

<script>
import Game from '../classes/game.js';

export default {
    name: "GamePage",

    data: () => ({
        gameTitle: '',
        game: null,
    }),

    mounted() {
        this.game = new Game(this.$route.params.game);

        this.gameTitle = this.game.title;
    },

    methods: {},
}
</script>