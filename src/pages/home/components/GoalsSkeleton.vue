<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
	<div class="p-4">
		<div class="flex mb-4 gap-3 items-center">
			<Skeleton class="size-12 rounded-full" />
			<div class="flex gap-2 flex-col">
				<Skeleton class="h-[20px] w-[250px]" />
				<Skeleton class="h-[15px] w-[200px]" />
			</div>
		</div>
		<div class="mt-4">
			<Skeleton class="h-[15px] w-full" />
		</div>
	</div>
</template>
