<script setup lang="ts">
import { Card } from '@/components/Base'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerTrigger,
	DrawerTitle,
	DrawerHeader
} from '@/components/ui/drawer'
import { terms } from '@/data/data.ts'
import { ref } from 'vue'

const income = ref('0')
const amount = ref(1000)
const percentage = ref(27)
const selectedId = ref(3)

const handleTermChange = (id: number, percent: number) => {
	selectedId.value = id
	percentage.value = percent
	calculateIncome(amount.value, percentage.value)
}

const calculateIncome = (amount: number, percentage: number) => {
	const calculatedIncome = (amount * percentage) / 100
	income.value = calculatedIncome.toString()
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
				<div class="flex gap-[12px] py-[24px]">
					<div
						v-for="(term, index) in terms"
						:key="term.periodInMonth"
						:id="`term-${index + 1}`"
						class="contentFormListItem"
						:class="{ active: selectedId === index + 1 }"
						@click="handleTermChange(index + 1, term.percent)"
					>
						{{ term.title }}
					</div>
				</div>
				<Card class="flex mb-[16px] items-center justify-between">
					<Card
						class="flex bg-white flex-col text-[13px] font-medium leading-[18px] text-neutral"
					>
						Если вложить
						<span class="text-black text-[16px] leading-[21px]"
							>1 000 000 сум</span
						>
					</Card>
					<div
						class="flex border justify-center items-center size-6 rounded-full bg-white"
					>
						<i class="icon-arrow-right text-[9px] text-neutral/50" />
					</div>

					<Card
						class="flex bg-white flex-col text-[13px] font-medium leading-[18px] text-neutral"
					>
						Ваша прибыль
						<span class="text-[#10C44C] text-right text-[16px] leading-[21px]"
							>+540 000</span
						>
					</Card>
				</Card>
			</div>
		</DrawerContent>
	</Drawer>
</template>

<style scoped lang="postcss">
.contentFormListItem {
	cursor: pointer;
	font-weight: 500;
	letter-spacing: -0.01em;
	line-height: 21px;
	text-align: left;
	@apply px-[14px] py-[12px] rounded-[12px] text-neutral/60;
	width: 79px;
	height: 45px;

	background-color: #f4f4f5;
	outline: #f4f4f5 solid 2px;

	&.active {
		@apply bg-[#3680FF12]/10 text-black;
		outline-color: #3680ff;
	}
}
</style>
