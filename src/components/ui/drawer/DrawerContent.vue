<script lang="ts" setup>
import type { DialogContentEmits, DialogContentProps } from 'radix-vue'
import type { HtmlHTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useForwardPropsEmits } from 'radix-vue'
import { DrawerContent, DrawerPortal } from 'vaul-vue'
import DrawerOverlay from './DrawerOverlay.vue'

const props = defineProps<
	DialogContentProps & { class?: HtmlHTMLAttributes['class'] }
>()
const emits = defineEmits<DialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
	<DrawerPortal>
		<DrawerOverlay />
		<DrawerContent
			v-bind="forwarded"
			:class="
				cn(
					'fixed after:hidden inset-x-4 bottom-8 z-50 mt-24 flex h-auto flex-col rounded-[16px] border bg-white',
					props.class
				)
			"
		>
			<div
				class="mx-auto -translate-y-4 w-[45px] h-[5px] rounded-full bg-neutral dark:bg-neutral"
			/>
			<slot />
		</DrawerContent>
	</DrawerPortal>
</template>
