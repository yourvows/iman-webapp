<script setup lang="ts">
defineProps<{
	text: string
}>()
</script>

<template>
	<div
		class="px-3 py-2 bg-white/10 rounded-full justify-center items-center gap-2 inline-flex"
	>
		<p class="text-white text-[15px] font-medium leading-tight">
			{{ text }}
		</p>
	</div>
</template>
