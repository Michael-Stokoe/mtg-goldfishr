<template>
    <button type="button"
        class="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {{ label }}
    </button>
</template>

<script>
export default {
    name: "Btn",

    props: [
        'label',
    ],

    data: () => ({}),

    mounted() { },

    methods: {},

    computed: {},
}
</script>