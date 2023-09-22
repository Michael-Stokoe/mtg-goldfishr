<template>
    <div class="container flex flex-col mx-auto space-y-6">
        <div class="grid w-full grid-cols-3 py-6">
            <div class="col-span-1 text-left">
                <router-link to="/" class="text-2xl font-semibold text-white hover:underline">
                    Go Back</router-link>
            </div>
            <div class="col-span-1 text-center">
                <h1 class="text-5xl font-semibold text-white">{{ gameTitle }}</h1>
            </div>
            <div class="col-span-1"></div>
        </div>

        <div class="flex flex-col p-6 space-y-4 text-white bg-gray-800 rounded-lg">
            <div class="flex justify-between w-full">
                <h3 class="text-xl font-semibold">Rules:</h3>

                <a href="#" @click.prevent="showRules = !showRules">x</a>
            </div>

            <ul class="list-disc list-inside" v-html="gameRulesText" v-show="showRules"></ul>
        </div>

        <div class="grid grid-cols-2 p-6 text-white bg-gray-800 rounded-lg">
            <h3 class="text-xl font-semibold">Game Board</h3>
            <div class="flex flex-col p-6 space-y-4 text-center bg-gray-700 rounded-lg">
                <life-counter :startingLife="40" />
            </div>
        </div>
    </div>
</template>

<script>
import Game from '../classes/game.js';
import LifeCounter from '../components/LifeCounter.vue';

export default {
    name: "GamePage",

    components: {
        LifeCounter,
    },

    data: () => ({
        gameTitle: '',
        game: null,
        showRules: true,
    }),

    mounted() {
        this.game = new Game(this.$route.params.game);

        this.gameTitle = this.game.title;
    },

    methods: {},

    computed: {
        gameRulesText() {
            if (this.game) {
                return this.game.getGameRulesText();
            }

            return '';
        }
    }
}
</script>