<script setup lang="ts">
import type { HtmlHTMLAttributes } from 'vue'
import { cn } from '@/lib/utils.ts'

const props = defineProps<{ class?: HtmlHTMLAttributes['class'] }>()
</script>

<template>
	<div :class="cn('bg-neutral/[0.06] rounded-2xl p-4', props.class)">
		<slot />
	</div>
</template>
