<script setup lang="ts">
import { Currency } from '@/types/strategies.type.ts'
import { Card } from '@/components/Base'
import { IInvestment } from '@/types/investment.type.ts'
import { formatMoney } from '@/utils'
import { onMounted } from 'vue'
import { useSharedStore } from '@/stores/shared.ts'

const props = defineProps<{
	investment: IInvestment
}>()

const sharedStore = useSharedStore()

const getApproximateUSD = (sum: number) =>
	Number((sum / sharedStore.usd_rate).toFixed())

onMounted(() => {
	if (props.investment.currency === Currency.USD) {
		sharedStore.getUSDRate()
	}
})
</script>

<template>
	<Card class="w-full bg-white">
		<RouterLink
			:to="`/goal/${investment.guid}`"
			class="border-b pb-4 flex justify-between items-center gap-3"
		>
			<div
				class="flex gap-3 items-center font-medium text-[15px] leading-[20px]"
			>
				<div
					class="size-12 rounded-full flex items-center justify-center bg-neutral/10"
				>
					<i class="icon-suitcase text-blue" />
				</div>
				<div>
					<div class="text-lg font-semibold leading-[23px]">
						{{ formatMoney(investment.investment_amount, 'ru-RU') }}
						<span
							v-if="investment.currency === Currency.USD"
							class="text-neutral text-[13px] font-semibold leading-[18px]"
						>
							~{{
								formatMoney(
									getApproximateUSD(investment.investment_amount),
									'ru-RU',
									Currency.USD
								)
							}}
						</span>
					</div>
					<p class="text-neutral text-[13px] font-medium leading-[18px]">
						{{ investment.goal.title.length ? investment.goal.title : `Вклад` }}
					</p>
				</div>
			</div>
			<i class="icon-chevron-right text-neutral/50" />
		</RouterLink>
		<div
			class="flex items-center text-[13px] leading-[18px] mt-4 justify-between"
		>
			<div class="flex items-center gap-2">
				<p class="text-neutral font-medium">Текущий месяц</p>
				<p class="font-semibold">
					+
					{{ formatMoney(investment.last_month_profit.amount, 'ru-RU') }}
				</p>
			</div>
			<div class="flex items-center gap-1">
				<img
					v-if="investment.currency === Currency.UZS"
					class="size-3"
					src="@/assets/icons/uzs.svg"
					alt="uzs"
				/>
				<img v-else class="size-3" src="@/assets/icons/usd.svg" alt="uzs" />
				<span class="text-right text-neutral text-xs font-medium leading-none">
					{{ investment.currency === Currency.UZS ? 'сум' : '$' }}
				</span>
			</div>
		</div>
	</Card>
</template>
