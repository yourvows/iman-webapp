<script setup lang="ts">
import { Card } from '@/components/Base'
import { calculateProfitability, formatMoney } from '@/utils'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerTrigger,
	DrawerTitle,
	DrawerHeader
} from '@/components/ui/drawer'
import { computed, ref } from 'vue'
import { useStrategiesStore } from '@/stores/strategies.ts'
import { ITariff } from '@/types/strategies.type.ts'

const strategiesStore = useStrategiesStore()

const amount = ref(1000000)

const terms = computed(() => strategiesStore.GET_ACTIVE_UZS_TARIFFS)

const selectedTerm = ref(terms.value[0])

const handleTermChange = (term: ITariff) => {
	selectedTerm.value = term
}
</script>

<template>
	<Drawer>
		<DrawerTrigger as="button">
			<Card class="flex justify-between items-center gap-3">
				<div
					class="flex w-[90%] items-center gap-[18px] font-medium text-[15px] leading-[20px]"
				>
					<i class="icon-calculator text-blue text-[18px]" />Калькулятор прибыли
				</div>
				<i class="icon-chevron-right text-neutral/50" />
			</Card>
		</DrawerTrigger>

		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle as="h3">Калькулятор прибыли</DrawerTitle>
			</DrawerHeader>
			<DrawerDescription class="container text-center text-neutral" as="p">
				Прибыль меняется в зависимости от срока вклада
			</DrawerDescription>
			<div class="container">
				<div
					class="flex first:pl-3 gap-[12px] py-[24px] overflow-x-auto no-scrollbar"
				>
					<div
						v-for="(term, index) in terms"
						:key="term.guid"
						:id="`term-${index + 1}`"
						class="contentFormListItem"
						:class="{
							active: selectedTerm?.guid === term.guid
						}"
						@click="handleTermChange(term)"
					>
						{{ term.terms }} мес
					</div>
				</div>

				<Card class="flex mb-[16px] items-center justify-between">
					<Card
						class="flex w-[159px] bg-white flex-col text-[13px] font-medium leading-[18px] text-neutral"
					>
						Если вложить

						<input
							v-model="amount"
							pattern="[0-9]*"
							class="bg-transparent outline-none text-black text-[16px] leading-[21px]"
						/>
					</Card>

					<div
						class="flex border justify-center items-center size-6 rounded-full bg-white"
					>
						<i class="icon-arrow-right text-[9px] text-neutral/50" />
					</div>

					<Card
						class="flex w-[159px] bg-white text-left flex-col text-[13px] font-medium leading-[18px] text-neutral"
					>
						Ваша прибыль
						<span class="text-[#10C44C] text-[16px] leading-[21px]"
							>+{{
								formatMoney(
									calculateProfitability({
										initialAmount: amount,
										isDollar: false,
										isCapitalized: false,
										tariff: selectedTerm
									}).result,
									'ru-RR'
								)
							}}</span
						>
					</Card>
				</Card>
			</div>
		</DrawerContent>
	</Drawer>
</template>

<style scoped lang="postcss">
.contentFormListItem {
	font-weight: 500;
	letter-spacing: -0.01em;
	line-height: 21px;
	@apply rounded-[12px] flex items-center justify-center text-neutral/60 cursor-pointer;
	min-width: 79px;
	height: 45px;

	background-color: #f4f4f5;
	outline: #f4f4f5 solid 2px;

	&.active {
		@apply bg-[#3680FF12]/10 text-black;
		outline-color: #3680ff;
	}
}
</style>
