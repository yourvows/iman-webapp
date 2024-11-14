<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { BackButton } from 'vue-tg'
import { computed, onMounted, ref } from 'vue'
import { Header, PayViaModal } from '@/components/Layout'
import { InfoTab } from '@/components/Base'
import { useInvestmentsStore } from '@/stores/investments.ts'
import { Currency } from '@/types/strategies.type.ts'
import { Warning, Danger, CardTab } from './components'
import { Button } from '@/components/ui/button'
import { formatMoney } from '@/utils'
import { useSharedStore } from '@/stores/shared.ts'
import { useInvestorStore } from '@/stores/investor.ts'

const route = useRoute()
const router = useRouter()
const investmentsStore = useInvestmentsStore()
const investorStore = useInvestorStore()
const sharedStore = useSharedStore()

const loading = ref(true)

const currentGoal = computed(() => {
	const id = Array.isArray(route.params.id)
		? route.params.id[0]
		: route.params.id
	return investmentsStore.GET_GOAL_BY_ID(id)
})

const totalBonus = computed(() => {
	const total = currentGoal.value?.bonuses.reduce(
		(acc, bonus) => acc + bonus.current_value,
		0
	)
	return total > 100 ? 100 : total
})

onMounted(() => {
	Promise.allSettled([
		investmentsStore.getInvestments(),
		sharedStore.checkUserVerification(),
		investorStore.getCards()
	]).finally(() => (loading.value = false))
})
</script>

<template>
	<div>
		<Header top-class="justify-end">
			<template #top>
				<Button variant="outline">
					<i class="icon-edit text-white text-[17px]" />
				</Button>
			</template>
			<div class="flex flex-col mb-6 items-center gap-3">
				<span class="text-white text-[15px] font-semibold leading-tight">
					{{
						currentGoal?.goal.title.length
							? currentGoal?.goal.title
							: 'Вклад №1'
					}}
				</span>
				<p class="text-white text-[32px] font-medium leading-[38px]">
					{{ formatMoney(currentGoal?.investment_amount, 'ru-RU') }}
				</p>
			</div>

			<div class="flex justify-center gap-1.5">
				<InfoTab
					:text="
						currentGoal?.currency === Currency.UZS ? 'Сумовый' : 'Долларовый'
					"
				/>
				<InfoTab :text="`На ${currentGoal?.investment_tariff.term} мес`" />
				<InfoTab :text="`~${currentGoal?.investment_tariff.forecast}% в год`" />
			</div>
		</Header>
		<section class="container space-y-4 my-6">
			<Warning v-if="currentGoal?.investment_amount <= 0" />
			<Danger v-if="!sharedStore.isUserVerified && !loading" />
			<PayViaModal>
				<template #trigger>
					<Button class="w-full h-14">Пополнить</Button>
				</template>
			</PayViaModal>

			<div class="space-y-2">
				<CardTab title="Ваша общая прибыль" />
				<CardTab title="+10% доля за 100 баллов">
					<span class="text-[15px] font-semibold leading-tight">
						{{ totalBonus }}/100 баллов
					</span>
				</CardTab>
				<CardTab title="Цель" />
				<CardTab title="Автопополнение" />
				<CardTab title="История платежей" />
			</div>
		</section>
		<!--		<pre class="text-[12px]">{{ currentGoal }}</pre>-->
		<BackButton @click="() => router.push('/home')" />
	</div>
</template>
