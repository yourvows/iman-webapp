<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useTelegram } from '@/composables/useTelegram.ts'

const { webApp } = useTelegram()
const route = useRoute()

onMounted(() => {
	webApp.ready()
	webApp.enableVerticalSwipes()
	webApp.enableClosingConfirmation()
})
</script>

<template>
	<component :is="route.meta.layoutComponent">
		<slot class="container" />
	</component>
</template>

<style lang="postcss">
body {
	@apply bg-white text-black;
}
</style>
