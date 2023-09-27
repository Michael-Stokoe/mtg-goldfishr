<template>
    <div class="flex">
        <div class="relative" @mouseenter="hovering = true" @mouseleave="hovering = false">
            <div v-if="hovering && !hideOverlay"
                class="absolute top-0 left-0 z-50 w-full h-full transition-transform bg-black rounded-xl opacity-80" :class="{
                    'rotate-90 translate-x-10': cardIsTapped,
                }">
                <div class="flex flex-col justify-center h-full space-y-4">
                    <p class="text-lg font-bold text-center text-white">{{ card.name }}</p>

                    <div class="flex flex-col space-y-1">

                        <p @click="tapCard" v-if="!cardIsTapped"
                            class="px-4 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-gray-800">
                            <i class="w-6 fa-solid fa-arrow-rotate-right"></i> <span>Tap</span>
                        </p>

                        <p @click="untapCard" v-if="cardIsTapped"
                            class="px-4 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-gray-800">
                            <i class="w-6 fa-solid fa-arrow-rotate-left"></i> <span>Untap</span>
                        </p>

                        <p @click="removeFromCombat" v-if="cardIsTapped && isAttacking"
                            class="px-4 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-gray-800">
                            <i class="w-6 fa-solid fa-arrow-rotate-left"></i> <span>Remove from Combat</span>
                        </p>

                        <p v-if="showBlockOptions"
                            class="px-4 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-gray-800">
                            <i class="w-6 fa-solid fa-shield"></i> <span>Block</span>
                        </p>

                        <p v-if="showBlockOptions"
                            class="px-4 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-gray-800">
                            <i class="w-6 fa-solid fa-shield-virus"></i> <span>Lethal Block</span>
                        </p>

                        <p @click="destroyCard"
                            class="px-4 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-gray-800">
                            <i class="w-6 fa-solid fa-skull-crossbones"></i> <span>Destroy</span>
                        </p>

                        <p @click="exileCard"
                            class="px-4 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-gray-800">
                            <i class="w-6 fa-solid fa-ban"></i> <span>Exile</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="relative transition-transform" :class="{
                'rotate-90 translate-x-10': cardIsTapped,
            }">
                <img class="w-48 shadow-lg rounded-xl" :src="card.image" :class="{
                    'ring-red-600 ring-[5px] rounded-xl': isAttacking,
                }" />

                <div v-if="showAbilities"
                    class="absolute flex flex-col px-2 py-1 space-x-1 text-xs text-gray-900 -translate-y-1/2 bg-gray-200 top-1/2 left-3 rounded-xl">
                    <span v-for="ability in abilities" :key="ability">{{ ability }}</span>
                </div>

                <div v-if="showPowerToughness"
                    class="absolute px-2 py-1 text-xs font-bold text-gray-900 bg-gray-200 rounded-xl bottom-2 right-3">
                    {{ card.power }} / {{ card.toughness }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",

    props: ['card', 'hideOverlay'],

    mounted() {
        this.$events.on('refresh-state', () => this.refreshKey++);
    },

    unmounted() {
        this.$events.off('refresh-state');
    },

    data: () => ({
        hovering: false,
        refreshKey: 0,
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
        },

        showPowerToughness() {
            return this.card.superTypes.includes('Creature');
        },

        showAbilities() {
            return this.card.superTypes.includes('Creature') && this.card.abilities.length > 0;
        },

        abilities() {
            this.refreshKey;
            if (this.card.abilities.length) {
                return this.card.abilities;
            }

            return [];
        }
    },

    methods: {
        destroyCard() {
            this.$events.emit('destroy-card', this.card);
        },

        exileCard() {
            this.$events.emit('exile-card', this.card);
        },

        tapCard() {
            this.card.tapped = true;
        },

        untapCard() {
            this.card.tapped = false;
        },

        removeFromCombat() {
            this.card.isAttacking = false;
            this.card.tapped = false;
        }
    }
}
</script>