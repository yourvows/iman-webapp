<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef, watch } from 'vue'

const props = defineProps<{
	isOpen: boolean
}>()

const emit = defineEmits<{
	(e: 'close'): void
}>()

const modalRef = useTemplateRef('modalRef')

const handleClickOutside = (event: MouseEvent) => {
	if (event.target === modalRef.value) {
		emit('close')
	}
}

watch(
	() => props.isOpen,
	newVal => {
		if (newVal) {
			modalRef.value?.showModal()
		} else {
			modalRef.value?.close()
		}
	}
)

onMounted(() => {
	if (modalRef.value) {
		modalRef.value.addEventListener('click', handleClickOutside)
	}
})

onUnmounted(() => {
	if (modalRef.value) {
		modalRef.value.removeEventListener('click', handleClickOutside)
	}
})
</script>

<template>
	<dialog ref="modalRef" @cancel="emit('close')" class="mainDialog">
		<slot />
	</dialog>
</template>

<style scoped lang="postcss">
.mainDialog {
	width: 100%;
	max-width: 96%;
	left: 50%;
	bottom: 34px;
	top: auto;
	transform: translateX(-50%);
	border: none;
	outline: none;
	border-radius: 16px;
	transition: all 0.3s;

	&::backdrop {
		background: rgba(0, 0, 0, 0.5);
		transition: all 0.3s;
	}
}
</style>
