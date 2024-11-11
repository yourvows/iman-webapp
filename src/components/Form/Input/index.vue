<script setup lang="ts">
import { type HTMLAttributes, ref } from 'vue'
import { cn } from '@/lib/utils.ts'

defineProps<{
	label: string
	placeholder?: string
	labelFor?: string
	wrapperClass?: HTMLAttributes['class']
	labelClass?: HTMLAttributes['class']
	inputClass?: HTMLAttributes['class']
}>()
const model = defineModel()
</script>

<template>
	<div
		:class="
			cn(
				'relative flex flex-col-reverse bg-[#f4f4f5] rounded-[18px] w-full p-4',
				wrapperClass
			)
		"
	>
		<input
			:id="labelFor"
			class="peer"
			:class="
				cn(
					'bg-transparent outline-none placeholder:opacity-0 focus:placeholder:opacity-20',
					inputClass
				)
			"
			:placeholder
			v-model="model"
		/>
		<label
			:for="labelFor"
			class="peer-focus:text-neutral peer-focus:top-0 peer-focus:text-[12px]"
			:class="
				cn(
					'absolute left-4 text-neutral pointer-events-none transition-all duration-300',

					labelClass
				)
			"
			>{{ label }}</label
		>
	</div>
</template>
