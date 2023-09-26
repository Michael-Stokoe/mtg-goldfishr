<template>
    <div class="flex flex-col p-6 space-y-4 bg-gray-700 rounded-xl">
        <p>The opponent has cast the following non-permanent spell<span v-if="nonPermanents.length > 1">s</span> this turn:
        </p>

        <div class="grid grid-cols-5 gap-4">
            <card v-for="card in nonPermanentsRenderer" :card="card" :key="card.id" :hideOverlay="true" />
        </div>
    </div>
</template>

<script>
import Card from './Card.vue';

export default {
    components: {
        Card,
    },

    name: 'NonPermanentsPlayed',

    props: ['nonPermanents'],

    data: () => ({
        refreshKey: 0,
    }),

    methods: {},

    mounted() {
        this.$events.on('refresh-state', () => this.refreshKey++);
    },

    unmounted() {
        this.$events.off('refresh-state');
    },

    computed: {
        nonPermanentsRenderer() {
            this.refreshKey;
            return this.nonPermanents;
        }
    }
}
</script>