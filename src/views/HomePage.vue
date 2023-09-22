<template>
    <div class="container mx-auto flex flex-col space-y-6">
        <div class="py-6 text-center">
            <h1 class="text-white text-5xl font-semibold">Choose a Game</h1>
        </div>

        <div class="text-center text-white w-full">
            <h3 class="text-3xl">Select which challenge deck you'd like to play against below:</h3>
        </div>

        <div class="grid grid-cols-2 gap-4 mx-auto justify-center text-white">
            <game-selection-card :game="'minotaur'" :title="'Battle The Horde'" :image="'/img/minotaur.png'" />

            <game-selection-card :game="'hydra'" :title="'Face The Hydra'" :image="'/img/hydra.png'" />
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