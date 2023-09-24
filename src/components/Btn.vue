<template>
    <button type="button"
        class="px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        :class="{
            'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600': btnColour === 'indigo',
            'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600': btnColour === 'red',
            'bg-green-600 hover:bg-green-500 focus-visible:outline-green-600': btnColour === 'green',
            'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600': btnColour === 'blue',
            'bg-white-600 hover:bg-white-500 focus-visible:outline-white-600 text-gray-900': btnColour === 'white',
        }">
        {{ label }}
    </button>
</template>

<script>
export default {
    name: "Btn",

    props: [
        'label',
        'colour',
    ],

    data: () => ({
        btnColour: 'indigo',
    }),

    mounted() {
        if (this.colour) {
            this.btnColour = this.colour;
        }
    },

    methods: {},

    computed: {},
}
</script>