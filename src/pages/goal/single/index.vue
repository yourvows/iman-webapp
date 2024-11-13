<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { BackButton } from 'vue-tg'
import { computed, onMounted } from 'vue'
import { Header } from '@/components/Layout'
import { InfoTab } from '@/components/Base'
import { useInvestmentsStore } from '@/stores/investments.ts'
import { Currency } from '@/types/strategies.type.ts'
import { Warning } from './components'

const route = useRoute()
const router = useRouter()
const investmentsStore = useInvestmentsStore()

const currentGoal = computed(() => {
	const id = Array.isArray(route.params.id)
		? route.params.id[0]
		: route.params.id
	return investmentsStore.GET_GOAL_BY_ID(id)
})

onMounted(async () => {
	await investmentsStore.getInvestments()
})
</script>

<template>
	<div>
		<Header top-class="justify-end">
			<template #top>
				<button>
					<i class="icon-edit text-white text-[17px]" />
				</button>
			</template>
			<div class="flex flex-col mb-6 items-center gap-3">
				<span class="text-white text-[15px] font-semibold leading-tight">
					Вклад №1
				</span>
				<p class="text-white text-[32px] font-medium leading-[38px]">
					{{ currentGoal?.goal.amount }} <span>сум</span>
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
		<section class="container my-6">
			<Warning />
		</section>
		<pre class="text-[12px]">{{ currentGoal }}</pre>
		<BackButton @click="() => router.push('/home')" />
	</div>
</template>
