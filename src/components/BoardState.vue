<template>
    <div class="flex flex-col px-6 space-y-4">
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
</template>

<script>
import Card from './Card.vue';

export default {
    data: () => ({
        refreshKey: 0,
    }),
    mounted() {
        this.$events.on('refresh-state', () => { this.refreshKey++ });
    },
    unmounted() {
        this.$events.off('refresh-state');
    },
    components: {
        Card,
    },
    props: [
        'game'
    ],
    computed: {
        boardStateArtifacts() {
            this.refreshKey;
            if (this.game.opponent.boardState.length > 0) {
                return this.game.opponent.boardState.filter((card) => card.superTypes.includes('Artifact'));
            }
            return [];
        },
        boardStateCreatures() {
            this.refreshKey;
            if (this.game.opponent.boardState.length > 0) {
                return this.game.opponent.boardState.filter((card) => card.superTypes.includes('Creature'));
            }
            return [];
        },
    },
}
</script>