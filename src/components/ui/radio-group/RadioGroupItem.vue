<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Circle } from 'lucide-vue-next'
import {
	RadioGroupIndicator,
	RadioGroupItem,
	type RadioGroupItemProps,
	useForwardProps
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
	RadioGroupItemProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props

	return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<RadioGroupItem
		v-bind="forwardedProps"
		:class="
			cn(
				'aspect-square h-5 w-5 rounded-full border-[3px] border-blue text-blue ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				props.class
			)
		"
	>
		<RadioGroupIndicator class="flex items-center justify-center">
			<Circle class="h-3 w-3 fill-current text-current" />
		</RadioGroupIndicator>
	</RadioGroupItem>
</template>
