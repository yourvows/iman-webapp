<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
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
