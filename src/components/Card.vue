<template>
    <img class="w-48 shadow-lg rounded-xl" :src="card.image" />
</template>

<script>
export default {
    name: "Card",

    props: ['card'],

    data: () => ({
        //
    }),

    computed: {
        //
    },

    methods: {
        // 
    }
}
</script>