<template>
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
</template>

<script>
import Card from './Card.vue';
import Btn from './Btn.vue';

export default {
    components: {
        Card,
        Btn,
    },
    name: 'PseudoStack',
    props: [
        'game'
    ],
    data: () => ({}),
    methods: {
        currentCardResolves(resolves) {
            this.$events.emit('current-card-resolves', resolves);
        },
    },
    computed: {
        gameStarted() {
            if (this.game) {
                return this.game.started;
            }
            return false;
        },
        stack() {
            if (this.gameStarted) {
                return this.game.stack.stack;
            }
            return [];
        },
    },
}
</script>