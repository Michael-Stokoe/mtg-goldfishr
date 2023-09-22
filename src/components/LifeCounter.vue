<template>
    <h3 class="text-2xl font-semibold">Life Counter</h3>

    <div class="flex justify-center text-2xl">
        <div class="flex flex-col justify-center px-6">
            <span>-</span>
        </div>

        <span class="font-semibold text-7xl">{{ currentLifeTotal }}</span>

        <div class="flex flex-col justify-center px-6">
            <span>+</span>
        </div>
    </div>

    <div class="flex flex-row justify-center w-full space-x-4 text-xl">
        <span>-10</span>
        <span>-5</span>
        <span>-2</span>
        <span>-1</span>
        <span>+1</span>
        <span>+2</span>
        <span>+5</span>
        <span>+10</span>
    </div>
</template>

<script>
export default {
    props: [
        'startingLife',
    ],

    mounted() {
        this.currentLifeTotal = this.startingLife;
    },

    data: () => ({
        currentLifeTotal: 40,
        startingLifeTotal: 40,
    })
}
</script>