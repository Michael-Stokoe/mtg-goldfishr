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

                        <library :library="library" />
                    </div>

                    <div>
                        <p class="text-lg font-semibold">Graveyard ({{ cardsInOpponentsGraveyard }}):</p>

                        <graveyard :graveyard="graveyard" />
                    </div>

                    <div>
                        <p class="text-lg font-semibold">Exile ({{ cardsInOpponentsExile }}):</p>

                        <exile :exile="exile" />
                    </div>
                </div>
            </div>

            <div class="flex flex-col space-y-4">
                <div class="flex flex-col p-6 space-y-4 text-center bg-gray-700 rounded-lg">
                    <life-counter :startingLife="40" />
                </div>
                <settings />
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
                                    <btn :label="'No (Counter it)'" :colour="'red'" @click="currentCardResolves(false)" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="nonPermanentsPlayed.length" class="py-6 mx-6">
                        <non-permanents-played :nonPermanents="nonPermanentsPlayed" />
                    </div>


                    <div v-if="showMoveToCombatButton" class="flex flex-col justify-center space-y-2 text-center">
                        <p>The opponent would now like to move to combat, start opponent's combat phase?</p>
                        <div>
                            <btn :label="'Start Combat'" @click="startOpponentCombat" />
                        </div>
                    </div>

                    <div v-if="waitingToStartPlayerTurn" class="flex flex-col justify-center space-y-2 text-center">
                        <p>The opponent has now finished its turn. Click the button below to start your turn.</p>
                        <div>
                            <btn :label="'Start Your Turn'" @click="startPlayerTurn" />
                        </div>
                    </div>

                    <div v-if="waitingToStartPlayerTurn" class="flex flex-col justify-center space-y-2 text-center">
                        <p>The opponent has now finished its turn. Click the button below to start your turn.</p>
                        <div>
                            <btn :label="'Start Your Turn'" @click="startPlayerTurn" />
                        </div>
                    </div>

                    <board-state v-if="gameStarted" :game="game" />
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
import Settings from '../components/Settings.vue';
import NonPermanentsPlayed from '../components/NonPermanentsPlayed.vue';
import BoardState from '../components/BoardState.vue';

export default {
    name: "GamePage",

    components: {
        LifeCounter,
        Library,
        Graveyard,
        Exile,
        Btn,
        Card,
        Settings,
        NonPermanentsPlayed,
        BoardState,
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

        this.gameTitle = this.gameObject.title;

        this.$events.on('refresh-state', () => { this.refreshKey++ });
    },

    unmounted() {
        this.$events.off('refresh-state');
        this.$events.off('tap-card');
        this.$events.off('cast-card');
        this.$events.off('game-started');
        this.$events.off('current-card-resolves');
        this.$events.off('destroy-card');
        this.$events.off('exile-card');
        this.$events.off('card-resolves');
        this.$events.off('card-counteredd');
    },

    methods: {
        startGame() {
            this.gameObject.startGame();
        },

        setPlayerFirst(first) {
            this.gameObject.setPlayerFirstAndStart(first);
        },

        startOpponentTurn() {
            this.gameObject.startOpponentTurn();
        },

        currentCardResolves(resolves) {
            this.$events.emit('current-card-resolves', resolves);
        },

        startOpponentCombat() {
            this.gameObject.startOpponentCombat();
        },

        startPlayerTurn() {
            this.gameObject.startPlayerTurn();
        },
    },

    computed: {
        gameObject() {
            this.refreshKey;
            return this.game;
        },

        gameStarted() {
            if (this.gameObject) {
                return this.gameObject.started;
            }
            return false;
        },

        gameRulesText() {
            return this.gameObject ? this.gameObject.getGameRulesText() : '';
        },

        graveyard() {
            if (this.gameObject.opponent) {
                return this.gameObject.opponent.graveyard;
            }
            return [];
        },

        library() {
            if (this.gameObject.opponent) {
                return this.gameObject.opponent.library;
            }
            return [];
        },

        exile() {
            if (this.gameObject.opponent) {
                return this.gameObject.opponent.exile;
            }
            return [];
        },

        showStartOpponentsTurnButton() {
            if (this.gameStarted && this.gameObject.firstPlayerChosen) {
                if (!this.gameObject.isOpponentTurn) {
                    return true;
                }
            }
            // return (this.gameStarted && (this.gameObject.firstPlayerChosen)) ? !(this.gameObject.isOpponentTurn) : false;
        },

        showWhoseFirstQuestion() {
            return (this.gameStarted && this.gameObject.currentTurn === null) ?? false;
        },

        showMoveToCombatButton() {
            if (this.gameStarted && this.gameObject.isOpponentTurn) {
                return this.gameObject.waitingToStartCombat;
            }

            return false;
        },

        isPlayersTurn() {
            return (this.gameStarted && this.gameObject.isOpponentTurn === false) ?? false;
        },

        showFirstTurnText() {
            return (this.gameStarted && this.gameObject.currentTurn === 0 && this.gameObject.firstPlayerChosen && !this.gameObject.isOpponentTurn) ?? false;
        },

        showCurrentTurnNumber() {
            return (this.gameStarted && this.gameObject.currentTurn !== null) ?? false;
        },

        currentTurn() {
            return (this.gameStarted && this.gameObject.currentTurn !== null) ? this.gameObject.currentTurn : 0;
        },

        boardState() {
            this.refreshKey;
            if (this.gameStarted) return this.gameObject.opponent.boardState;
            return [];
        },

        cardsInOpponentsLibrary() {
            if (this.gameObject.opponent) {
                return this.library.length;
            }
            return 0;
        },

        cardsInOpponentsGraveyard() {
            if (this.gameObject.opponent) {
                return this.graveyard.length;
            }
            return 0;
        },

        cardsInOpponentsExile() {
            if (this.gameObject.opponent) {
                return this.exile.length;
            }
            return 0;
        },

        stack() {
            this.refreshKey;
            if (this.gameStarted) {
                return this.gameObject.stack.stack;
            }
            return [];
        },

        nonPermanentsPlayed() {
            this.refreshKey;

            if (this.gameStarted && this.gameObject.opponent) {
                return this.gameObject.opponent.nonPermanentsPlayed;
            }

            return [];
        },

        waitingToStartPlayerTurn() {
            if (this.gameStarted) {
                return this.gameObject.waitingToStartPlayerTurn;
            }

            return false;
        },

        isPlayersTurn() {
            if (this.gameStarted) {
                return this.gameObject.isPlayersTurn;
            }

            return false;
        }
    }
}
</script>