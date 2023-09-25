<template>
    <div class="flex flex-col p-6 space-y-4 bg-gray-700 rounded-xl">
        <div class="flex flex-row justify-between cursor-pointer" @click="showSettings = !showSettings">
            <h2 class="text-xl font-semibold text-center">Settings</h2>

            <span>
                <i class="text-xl transition-transform duration-500 fa-solid fa-circle-chevron-up" :class="{
                    'rotate-180': !showSettings,
                }"></i>
            </span>
        </div>

        <div class="flex flex-col space-y-4" v-show="showSettings">
            <div class="relative flex items-start">
                <div class="flex items-center h-6">
                    <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
                        class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                        v-model="autoResolveSpells">
                </div>
                <div class="ml-3 text-sm leading-6">
                    <label for="comments" class="font-medium text-gray-100">Auto-resolve Spells</label>
                    <p id="comments-description" class="text-gray-300">Uncheck if you run counter-spells in your deck
                    </p>
                </div>
            </div>

            <div class="relative flex items-start">
                <div class="flex items-center h-6">
                    <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
                        class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                        v-model="autoSubtract">
                </div>
                <div class="ml-3 text-sm leading-6">
                    <label for="comments" class="font-medium text-gray-100">Auto-subtract life</label>
                    <p id="comments-description" class="text-gray-300">Unblocked attackers will automatically reduce the
                        life
                        counter
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Settings',
    data: () => ({
        showSettings: false,
        autoResolveSpells: true,
        autoSubtract: true,
    }),
}
</script>