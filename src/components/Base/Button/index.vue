<script setup lang="ts"></script>

<template>
	<button class="btn">
		<slot />
	</button>
</template>

<style scoped lang="postcss">
.btn {
	@apply w-full flex items-center justify-center bg-blue text-white h-14 rounded-2xl font-semibold;
}
</style>
