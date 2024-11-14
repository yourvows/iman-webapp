<script setup lang="ts">
import { Card } from '@/components/Base'
</script>

<template>
	<Card
		class="border flex bg-white gap-4 border-[#ffbb38] rounded-2xl backdrop-blur-[10px]"
	>
		<div
			class="flex rounded-lg items-center justify-center min-w-[40px] size-[40px] bg-[#ffbb38]/[0.07]"
		>
			<i class="icon-info text-[#ffbb38]" />
		</div>
		<div>
			<h3 class="text-[15px] font-semibold leading-tight">
				Пока на вкладе нет денег, прибыль начисляться не будет
			</h3>
			<p class="text-neutral text-[13px] font-medium leading-[18px]">
				Пополните вклад, чтобы стать на шаг ближе к прибыли
			</p>
		</div>
	</Card>
</template>
