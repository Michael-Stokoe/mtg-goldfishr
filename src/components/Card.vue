<template>
    <div class="flex">
        <div class="relative" @mouseenter="hovering = true" @mouseleave="hovering = false" :class="{
            'ring-red-600 ring-[5px] rounded-xl': isAttacking,
        }">
            <div v-if="hovering" class="absolute top-0 left-0 z-50 w-full h-full bg-black rounded-xl opacity-80">
                <div class="flex flex-col justify-center h-full space-y-4">
                    <p class="text-lg font-bold text-center text-white">{{ card.name }}</p>

                    <div class="flex flex-col space-y-1">
                        <p v-if="showBlockOptions"
                            class="px-4 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-gray-800">
                            <i class="w-6 fa-solid fa-shield"></i> <span>Block</span>
                        </p>

                        <p v-if="showBlockOptions"
                            class="px-4 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-gray-800">
                            <i class="w-6 fa-solid fa-shield-virus"></i> <span>Lethal Block</span>
                        </p>

                        <p class="px-4 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-gray-800">
                            <i class="w-6 fa-solid fa-skull-crossbones"></i> <span>Destroy</span>
                        </p>

                        <p class="px-4 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-gray-800">
                            <i class="w-6 fa-solid fa-ban"></i> <span>Exile</span>
                        </p>
                    </div>
                </div>
            </div>
            <img class="w-48 shadow-lg rounded-xl" :src="card.image" :class="{
                'rotate-90 translate-x-10': cardIsTapped,
            }" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",

    props: ['card'],

    data: () => ({
        hovering: false,
    }),

    computed: {
        showBlockOptions() {
            if (this.card.superTypes.includes('Creature')) {
                // Get current phase. If we're not at declaration of blockers, don't show options.
                return 1;
            }

            return false;
        },

        isAttacking() {
            if (this.card.superTypes.includes('Creature')) {
                return this.card.isAttacking;
            }

            return false;
        },

        cardIsTapped() {
            return this.card.tapped;
        }
    },

    methods: {
        // 
    }
}
</script>