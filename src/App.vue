<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useWebAppMainButton } from 'vue-tg'

const route = useRoute()
const { setMainButtonParams } = useWebAppMainButton()
setMainButtonParams({ color: '#3680FF', text_color: '#fff' })
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
