<template>
    <div class="flex flex-row justify-between cursor-pointer" @click="showLifeCounter = !showLifeCounter">
        <h2 class="text-xl font-semibold text-center">Life Counter</h2>

        <span>
            <i class="text-xl transition-transform duration-500 fa-solid fa-circle-chevron-up" :class="{
                'rotate-180': !showLifeCounter,
            }"></i>
        </span>
    </div>

    <div class="flex flex-col space-y-4" v-show="showLifeCounter">
        <div class="flex justify-center text-2xl">
            <div class="flex flex-col justify-center px-6">
                <span @click="adjustLife(-1)" class="text-gray-300 cursor-pointer hover:text-white">
                    <i class="fa-solid fa-circle-minus"></i>
                </span>
            </div>
            <span class="font-semibold text-7xl">{{ currentLifeTotal }}</span>
            <div class="flex flex-col justify-center px-6">
                <span @click="adjustLife(+1)" class="text-gray-300 cursor-pointer hover:text-white">
                    <i class="fa-solid fa-circle-plus"></i>
                </span>
            </div>
        </div>
        <div class="flex flex-row justify-center w-full space-x-4">
            <span @click="adjustLife(-10)"
                class="flex flex-col justify-center w-10 h-10 text-lg text-gray-800 bg-gray-300 rounded-full cursor-pointer hover:bg-white">
                <span>-10</span>
            </span>
            <span @click="adjustLife(-5)"
                class="flex flex-col justify-center w-10 h-10 text-lg text-gray-800 bg-gray-300 rounded-full cursor-pointer hover:bg-white">
                <span>-5</span>
            </span>
            <span @click="adjustLife(-3)"
                class="flex flex-col justify-center w-10 h-10 text-lg text-gray-800 bg-gray-300 rounded-full cursor-pointer hover:bg-white">
                <span>-3</span>
            </span>
            <span @click="adjustLife(-2)"
                class="flex flex-col justify-center w-10 h-10 text-lg text-gray-800 bg-gray-300 rounded-full cursor-pointer hover:bg-white">
                <span>-2</span>
            </span>
            <span @click="adjustLife(+2)"
                class="flex flex-col justify-center w-10 h-10 text-lg text-gray-800 bg-gray-300 rounded-full cursor-pointer hover:bg-white">
                <span>+2</span>
            </span>
            <span @click="adjustLife(+3)"
                class="flex flex-col justify-center w-10 h-10 text-lg text-gray-800 bg-gray-300 rounded-full cursor-pointer hover:bg-white">
                <span>+3</span>
            </span>
            <span @click="adjustLife(+5)"
                class="flex flex-col justify-center w-10 h-10 text-lg text-gray-800 bg-gray-300 rounded-full cursor-pointer hover:bg-white">
                <span>+5</span>
            </span>
            <span @click="adjustLife(+10)"
                class="flex flex-col justify-center w-10 h-10 text-lg text-gray-800 bg-gray-300 rounded-full cursor-pointer hover:bg-white">
                <span>+10</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'startingLife',
    ],

    mounted() {
        this.currentLifeTotal = this.startingLife;

        this.$events.on('gain-life', amount => this.currentLifeTotal += amount);
        this.$events.on('lose-life', amount => this.currentLifeTotal -= amount);
    },

    data: () => ({
        showLifeCounter: true,
        currentLifeTotal: 40,
        startingLifeTotal: 40,
    }),

    methods: {
        adjustLife(amount) {
            this.currentLifeTotal += amount;
        }
    }
}
</script>