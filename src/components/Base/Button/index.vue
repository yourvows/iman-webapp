<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	variant: 'primary' | 'secondary' | 'transparent' | 'white'
}>()

const buttonClass = computed(() => {
	return {
		btn: true,
		[props.variant]: props.variant
	}
})
</script>

<template>
	<button :class="buttonClass">
		<slot />
	</button>
</template>

<style scoped lang="postcss">
.btn {
	@apply w-full flex items-center px-4 justify-center h-14 rounded-2xl font-semibold;
}
.primary {
	@apply bg-blue text-white;
}
.secondary {
	@apply bg-neutral text-blue;
}
.white {
	@apply bg-white text-blue;
}
.transparent {
	@apply bg-white/10 text-white;
}
</style>
