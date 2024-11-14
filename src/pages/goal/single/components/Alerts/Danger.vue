<script setup lang="ts">
import { Card } from '@/components/Base'
import { Button } from '@/components/ui/button'
</script>

<template>
	<Card
		class="border bg-white border-[#f93c65] rounded-2xl backdrop-blur-[10px]"
	>
		<div class="flex gap-4 mb-4">
			<div
				class="flex rounded-lg items-center justify-center min-w-[40px] size-[40px] bg-[#f93c65]/[0.07]"
			>
				<i class="icon-warning text-[#f93c65]" />
			</div>
			<div>
				<h3 class="text-[15px] font-semibold leading-tight">
					Без верификации мы не можем начислять прибыль
				</h3>
				<p class="text-neutral text-[13px] font-medium leading-[18px]">
					Пройдите верификацию, чтобы прибыль начала рассчитываться
				</p>
			</div>
		</div>
		<Button variant="ghost" class="w-full text-[13px]">
			Пройти верификацию
		</Button>
	</Card>
</template>
