<script setup lang="ts">
import { Card } from '@/components/Base'
defineProps<{
	title: string
}>()
</script>

<template>
	<Card>
		<div class="flex items-center justify-between border-b pb-3">
			<h3
				class="text-neutral text-[13px] font-bold uppercase leading-tight tracking-wide"
			>
				{{ title }}
			</h3>
			<i class="icon-chevron-right text-[12px] text-neutral" />
		</div>
		<div class="mt-3">
			<slot />
		</div>
	</Card>
</template>
