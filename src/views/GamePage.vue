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
            <div class="flex justify-between w-full cursor-pointer" @click.prevent="showRules = !showRules">
                <h3 class="text-2xl font-semibold">Rules</h3>

                <span>
                    <i class="text-2xl transition-transform duration-500 fa-solid fa-circle-chevron-up" :class="{
                        'rotate-180': !showRules,
                    }"></i>
                </span>
            </div>

            <ul class="list-disc list-inside" v-html="gameRulesText" v-show="showRules"></ul>
        </div>

        <div class="grid grid-cols-3 p-6 text-white bg-gray-800 rounded-lg">
            <div class="flex flex-col col-span-2 space-y-6">
                <h3 class="text-2xl font-semibold">Game Board</h3>

                <div class="grid grid-cols-3 gap-4" v-if="game">
                    <div>
                        <p class="text-lg font-semibold">Library ({{ cardsInOpponentsLibrary }}):</p>

                        <library :library="game.opponent.library" />
                    </div>

                    <div>
                        <p class="text-lg font-semibold">Graveyard ({{ cardsInOpponentsGraveyard }}):</p>

                        <graveyard :graveyard="game.opponent.graveyard" />
                    </div>

                    <div>
                        <p class="text-lg font-semibold">Exile ({{ cardsInOpponentsExile }}):</p>

                        <exile :exile="game.opponent.exile" />
                    </div>
                </div>
            </div>

            <div>
                <div class="flex flex-col p-6 space-y-4 text-center bg-gray-700 rounded-lg">
                    <life-counter :startingLife="40" />
                </div>
            </div>

            <div class="flex flex-col col-span-3 mt-8 space-y-6">
                <h3 class="text-2xl font-semibold">Battlefield</h3>
                <span v-if="showCurrentTurnNumber">Current Turn:
                    <span class="font-semibold text-white">{{ currentTurn }}</span>
                </span>

                <div class="flex flex-col justify-center border-[3px] border-gray-500 rounded-xl" :class="{
                    'py-24': !gameStarted,
                    'py-6': gameStarted,
                }">
                    <div class="flex justify-center">
                        <btn v-if="!gameStarted" :label="'Start Game'" @click="startGame" />
                    </div>

                    <div class="flex flex-col space-y-2 text-center" v-if="showWhoseFirstQuestion">
                        <p>Are you going first?</p>

                        <div class="flex justify-center space-x-2">
                            <btn :label="'Yes'" @click="setPlayerFirst(true)" />
                            <btn :label="'No'" @click="setPlayerFirst(false)" />
                        </div>
                    </div>

                    <div v-if="showStartOpponentsTurnButton" class="flex flex-col justify-center space-y-2 text-center">
                        <p v-if="showFirstTurnText">Play out your desired amount of setup turns and hit the button below to
                            start the Opponent's first turn.</p>
                        <div>
                            <btn :label="'Start Opponent\'s Turn'" @click="startOpponentTurn" />
                        </div>
                    </div>

                    <div class="flex flex-col px-6 space-y-4">
                        <div v-if="stack.length" class="flex flex-col mt-8 space-y-4">
                            <p class="text-xl font-semibold">The opponent is casting...</p>
                            <div class="flex space-x-4">
                                <card :card="stack[0]" :hideOverlay="true" />

                                <div class="flex flex-col space-y-2 text-left">
                                    <h2 class="text-xl font-semibold">{{ stack[0].name }}</h2>

                                    <p class="text-lg font-semibold">
                                        {{ stack[0].superTypes.join(', ') }}
                                        <span v-if="stack[0].superTypes.includes('Creature')">
                                            - {{ stack[0].subTypes.join(', ') }}
                                        </span>
                                    </p>

                                    <p v-if="stack[0].superTypes.includes('Creature')" class="text-lg font-semibold">
                                        {{ stack[0].power + '/' + stack[0].toughness }}
                                    </p>

                                    <p>Does it resolve?</p>

                                    <div class="flex space-x-2">
                                        <btn :label="'Yes'" @click="currentCardResolves(true)" />
                                        <btn :label="'No (Counter it)'" :colour="'red'"
                                            @click="currentCardResolves(false)" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="boardStateArtifacts.length" class="flex flex-col mt-8 space-y-4">
                            <p class="text-xl font-semibold">Artifacts</p>
                            <div class="grid grid-cols-5 gap-4">
                                <card v-for="card in boardStateArtifacts" :key="card.id" :card="card" />
                            </div>
                        </div>

                        <div v-if="boardStateCreatures.length" class="flex flex-col mt-8 space-y-4">
                            <p class="text-xl font-semibold">Creatures</p>
                            <div class="grid grid-cols-5 gap-4">
                                <card v-for="card in boardStateCreatures" :key="card.id" :card="card" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Game from '../classes/game.js';
import LifeCounter from '../components/LifeCounter.vue';
import Library from '../components/Library.vue';
import Graveyard from '../components/Graveyard.vue';
import Exile from '../components/Exile.vue';
import Btn from '../components/Btn.vue';
import Card from '../components/Card.vue';

export default {
    name: "GamePage",

    components: {
        LifeCounter,
        Library,
        Graveyard,
        Exile,
        Btn,
        Card,
    },

    data: () => ({
        gameTitle: '',
        game: null,
        showRules: false,
        refreshKey: 0,
        opponentIsCasting: false,
        cardOpponentIsCasting: null,
    }),

    mounted() {
        this.game = new Game(this.$route.params.game);

        this.gameTitle = this.game.title;

        this.$events.on('refresh-board-state', () => {
            this.refreshKey++;
        });

        // this.$events.on('cast-card', card => {
        //     this.opponentIsCasting = true;
        //     this.cardOpponentIsCasting = card;
        // });
    },

    methods: {
        startGame() {
            this.game.startGame();
        },

        setPlayerFirst(first) {
            this.game.setPlayerFirstAndStart(first);
        },

        startOpponentTurn() {
            this.game.startOpponentTurn();
        },

        currentCardResolves(resolves) {
            this.$events.emit('current-card-resolves', resolves);
        }
    },

    computed: {
        gameExists() {
            return this.game;
        },

        gameStarted() {
            if (this.gameExists) {
                return this.game.started;
            }
            return false;
        },

        gameRulesText() {
            return this.gameExists ? this.game.getGameRulesText() : '';
        },

        showStartOpponentsTurnButton() {
            return (this.gameStarted && (this.game.firstPlayerChosen)) ? !(this.game.isOpponentTurn) : false;
        },

        showWhoseFirstQuestion() {
            return (this.gameStarted && this.game.currentTurn === null) ?? false;
        },

        isPlayersTurn() {
            return (this.gameStarted && this.game.isOpponentTurn === false) ?? false;
        },

        showFirstTurnText() {
            return (this.gameStarted && this.game.currentTurn === 0 && this.game.firstPlayerChosen && !this.game.isOpponentTurn) ?? false;
        },

        showCurrentTurnNumber() {
            return (this.gameStarted && this.game.currentTurn !== null) ?? false;
        },

        currentTurn() {
            return (this.gameStarted && this.game.currentTurn !== null) ? this.game.currentTurn : 0;
        },

        boardState() {
            this.refreshKey;
            if (this.gameStarted) {
                return this.game.opponent.boardState;
            }
            return [];
        },

        boardStateArtifacts() {
            if (this.gameStarted) {
                return this.boardState.filter((card) => card.superTypes.includes('Artifact'));
            }
            return [];
        },

        boardStateCreatures() {
            if (this.gameStarted) {
                return this.boardState.filter((card) => card.superTypes.includes('Creature'));
            }
            return [];
        },

        cardsInOpponentsLibrary() {
            if (this.gameExists) {
                return this.game.opponent.library.length;
            }
            return 0;
        },

        cardsInOpponentsGraveyard() {
            if (this.gameExists) {
                return this.game.opponent.graveyard.length;
            }
            return 0;
        },

        cardsInOpponentsExile() {
            if (this.gameExists) {
                return this.game.opponent.exile.length;
            }
            return 0;
        },

        stack() {
            if (this.gameStarted) {
                return this.game.stack.stack;
            }
            return [];
        }
    }
}
</script>