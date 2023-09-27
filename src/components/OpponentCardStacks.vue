<template>
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
</template>

<script>
import Library from './Library.vue';
import Graveyard from './Graveyard.vue';
import Exile from './Exile.vue';

export default {
    components: {
        Library,
        Graveyard,
        Exile,
    },
    data: () => ({
        refreshKey: 0,
    }),
    mounted() {
        this.$events.on('refresh-state', () => {
            this.refreshKey++;
        });
    },
    unmounted() {
        this.$events.off('refresh-state');
    },
    props: [
        'game'
    ],
    computed: {
        library() {
            this.refreshKey;
            if (this.game.opponent) {
                return this.game.opponent.library;
            }
            return [];
        },

        graveyard() {
            this.refreshKey;
            if (this.game.opponent) {
                return this.game.opponent.graveyard;
            }
            return [];
        },

        exile() {
            this.refreshKey;
            if (this.game.opponent) {
                return this.game.opponent.exile;
            }
            return [];
        },

        cardsInOpponentsLibrary() {
            if (this.game.opponent) {
                return this.library.length;
            }
            return 0;
        },

        cardsInOpponentsGraveyard() {
            if (this.game.opponent) {
                return this.graveyard.length;
            }
            return 0;
        },

        cardsInOpponentsExile() {
            if (this.game.opponent) {
                return this.exile.length;
            }
            return 0;
        },
    },
}
</script>