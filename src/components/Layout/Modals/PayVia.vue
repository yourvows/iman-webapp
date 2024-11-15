<script setup lang="ts">
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerTrigger
} from '@/components/ui/drawer'
import { useInvestorStore } from '@/stores/investor.ts'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ref } from 'vue'

const investorStore = useInvestorStore()

const activeCard = ref()
</script>

<template>
	<Drawer>
		<DrawerTrigger class="w-full" as="div">
			<slot name="trigger" />
		</DrawerTrigger>
		<DrawerContent>
			<DrawerDescription class="px-4 py-6">
				<h3 class="text-xl font-semibold leading-[25px]">
					Пополнить с помощью
				</h3>
				<div class="py-6">
					<RouterLink
						to="#"
						class="flex border-b pb-4 mb-4 justify-between items-center"
					>
						<div class="flex items-center gap-[15px]">
							<div
								class="w-[60px] h-[38px] bg-[#f4f4f5] rounded-[9px] justify-center items-center inline-flex"
							>
								<i class="icon-bank text-[18px]" />
							</div>
							<div>
								<h3 class="text-base font-medium leading-[21px] tracking-tight">
									Банковский перевод
								</h3>
								<p
									class="text-[#040415]/50 text-[13px] font-medium leading-[18px]"
								>
									Перевод на счёт
								</p>
							</div>
						</div>
						<i class="icon-chevron-right text-neutral/50" />
					</RouterLink>
					<RadioGroup
						v-model="activeCard"
						:default-value="investorStore.cards[0]?.guid"
					>
						<div
							class="flex items-center justify-between"
							v-for="card in investorStore.cards"
							:key="card.guid"
						>
							<div class="flex items-center gap-[15px]">
								<div
									class="w-[60px] uppercase h-[38px] p-1 text-white bg-neutral rounded-[9px] justify-start items-end inline-flex"
								>
									{{ card.card_type }}
								</div>
								<span
									class="text-base font-medium leading-[21px] tracking-tight"
								>
									**{{ card.pan.slice(-4) }}
								</span>
							</div>
							<RadioGroupItem :id="card.guid" :value="card.guid" />
						</div>
					</RadioGroup>
					<RouterLink
						to="#"
						class="flex pt-4 mt-4 border-t justify-between items-center"
					>
						<div class="flex items-center gap-[15px]">
							<div
								class="w-[60px] h-[38px] bg-[#f4f4f5] rounded-[9px] justify-center items-center inline-flex"
							>
								<i class="icon-plus" />
							</div>
							<div>
								<h3 class="text-base font-medium leading-[21px] tracking-tight">
									Добавить новую карту
								</h3>
								<p
									class="text-[#040415]/50 text-[13px] font-medium leading-[18px]"
								>
									Карта для пополнения
								</p>
							</div>
						</div>
						<i class="icon-chevron-right text-neutral/50" />
					</RouterLink>
				</div>
				<div
					class="p-5 bg-[#4059e6]/10 rounded-2xl shadow border-2 border-[#8668d8] items-center gap-3 flex"
				>
					<div
						class="w-[42px] h-[42px] bg-white rounded-full justify-center items-center inline-flex"
					>
						<img src="@/assets/icons/gift-purple.svg" alt="gift" />
					</div>
					<div>
						<h3 class="text-base font-semibold leading-[21px]">
							Подарок для вас!
						</h3>
						<p class="text-neutral text-[13px] font-medium leading-[18px]">
							Комиссия 0% на первую инвестицию
						</p>
					</div>
				</div>
			</DrawerDescription>
		</DrawerContent>
	</Drawer>
</template>
