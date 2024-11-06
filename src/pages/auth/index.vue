<script setup lang="ts">
import Pin from './Pin.vue'
import PhoneNumber from './PhoneNumber.vue'
import Confirm from './Confirm.vue'
import { markRaw, ref } from 'vue'

const components = ref([markRaw(PhoneNumber), markRaw(Confirm), markRaw(Pin)])

let currentComponent = ref(components.value[0])
const step = ref(0)

function createStepManager() {
	return function (operation: (currentStep: number) => number) {
		step.value = operation(step.value)
		return step.value
	}
}

const stepManager = createStepManager()

function changeComponent(action: 'next' | 'back') {
	if (action === 'next') {
		stepManager(currentStep => currentStep + 1)
	} else {
		stepManager(currentStep => currentStep - 1)
	}
	currentComponent.value = components.value[step.value]
}
</script>

<template>
	<component
		ref="componentRef"
		@action="changeComponent"
		:is="currentComponent"
	/>
</template>
