<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils.ts'

interface SkeletonProps {
	class?: HTMLAttributes['class']
}

const props = defineProps<SkeletonProps>()
</script>

<template>
	<div :class="cn('animate-pulse rounded-md bg-neutral/30', props.class)" />
</template>
