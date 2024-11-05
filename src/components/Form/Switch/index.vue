<script setup lang="ts">
const model = defineModel()
</script>

<template>
	<label class="switch" :class="{ active: model }" for="cap">
		<input v-model="model" type="checkbox" name="cap" id="cap" />
	</label>
</template>

<style scoped lang="postcss">
.switch {
	padding: 2px;
	width: 46px;
	height: 28px;
	border-radius: 50px;
	background: #0404151a;
	display: inline-block;
	position: relative;
	cursor: pointer;

	&::after {
		content: '';
		position: absolute;
		width: 24px;
		height: 24px;
		top: 2px;
		left: 2px;
		background-color: #ffffff;
		border-radius: 50%;
		transition:
			transform 0.3s ease,
			background-color 0.3s ease;
	}

	input {
		position: absolute;
		opacity: 0;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		cursor: pointer;
	}

	&.active {
		background: #3680ff;
		&::after {
			transform: translateX(4.8vw);
		}
	}
}
</style>
