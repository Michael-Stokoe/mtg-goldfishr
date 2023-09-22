<template>
    <div class="container flex flex-col mx-auto space-y-6">
        <div class="py-6 text-center">
            <h1 class="text-5xl font-semibold text-white">Choose a Game</h1>
        </div>

        <div class="w-full text-center text-white">
            <h3 class="text-3xl">Select which challenge deck you'd like to play against below:</h3>
        </div>

        <div class="grid justify-center grid-cols-2 gap-4 mx-auto text-white">
            <game-selection-card :game="'minotaur'" :title="'Battle The Horde'" :image="'/img/minotaur.png'" />

            <game-selection-card :disabled="true" :game="'hydra'" :title="'Face The Hydra'" :image="'/img/hydra.png'" />
        </div>
    </div>
</template>

<script>
import GameSelectionCard from '../components/GameSelectionCard.vue';

export default {

    name: "HomePage",

    components: {
        GameSelectionCard,
    },

    data: () => ({

    }),
}
</script>