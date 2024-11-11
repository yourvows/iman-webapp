<script setup lang="ts">
import { Card, Icon } from '@/components/Base'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerTrigger
} from '@/components/ui/drawer'
import { IncomeCalc } from '@/pages/goal/select-plan/components/index.ts'
</script>

<template>
	<Drawer>
		<DrawerTrigger as="button">
			<Card class="card flex justify-between items-center gap-3">
				<div
					class="flex w-[90%] items-center gap-[18px] font-medium text-[15px] leading-[20px]"
				>
					<i class="icon-question text-neutral text-[18px]" />Вопросы и ответы
				</div>
				<i class="icon-chevron-right text-neutral/50" />
			</Card>
		</DrawerTrigger>
		<DrawerContent>
			<DrawerDescription>
				<div class="container">
					<div class="flex gap-[8px]">
						<Icon icon="uzs" size="32px" />
						<Icon icon="usd" size="32px" />
					</div>

					<div class="border-b py-4">
						<h3 class="font-semibold text-[16px] leading-[21px] mb-2">
							Чем отличаются тарифы?
						</h3>
						<p class="text-[15px] text-neutral font-medium leading-[20px]">
							Вы можете открыть вклад в узбекских сумах со ставкой до ~27% в год
							или в долларах США со ставкой ~13%
						</p>
					</div>
					<div class="border-b py-4 mb-4">
						<h3 class="font-semibold text-[16px] leading-[21px] mb-2">
							Что значит «Партнёрство 99%»?
						</h3>
						<p class="text-[15px] text-neutral font-medium leading-[20px]">
							99% прибыли с оборота идёт вам, <br />а 1% получаем мы
						</p>
					</div>
					<div class="flex flex-col gap-4 mb-6">
						<IncomeCalc />
						<Card class="card flex justify-between items-center gap-3">
							<div
								class="flex w-[90%] items-center gap-[18px] font-medium text-[15px] leading-[20px]"
							>
								<i class="icon-suitcase text-blue text-[18px]" />Как мы
								управляем вашими деньгами?
							</div>
							<i class="icon-chevron-right text-neutral/50" />
						</Card>
					</div>
				</div>
			</DrawerDescription>
		</DrawerContent>
	</Drawer>
</template>
