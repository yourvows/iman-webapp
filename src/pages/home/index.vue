<script setup lang="ts">
import { VButton } from '@/components/Base'
import { Header } from '@/components/Layout'
import { computed, onMounted } from 'vue'
import { useInvestmentsStore } from '@/stores/investments.ts'
import { useRouter } from 'vue-router'
import { Goal, GoalsSkeleton } from './components'
import { formatMoney } from '@/utils'

const investmentsStore = useInvestmentsStore()

const investments = computed(() => investmentsStore.investments)
const router = useRouter()

onMounted(() => {
	investmentsStore.getInvestments()
})
</script>

<template>
	<div class="wrapper bg-neutral/10">
		<Header>
			<div class="content">
				<h3 class="contentBalance">
					{{ formatMoney(investmentsStore.GET_TOTAL_PROFIT, 'ru-RU') }}
					<!--					<span>сум</span>-->
				</h3>
				<div class="contentProfit">
					<h3 class="contentProfitTitle">
						Нет вложений, чтобы начислять прибыль
					</h3>
				</div>
			</div>
			<!--			<div class="bottom">-->
			<!--				<span class="rocket">🚀</span>-->
			<!--				<div class="bottomTexts">-->
			<!--					<h3>Поставьте цель и получайте до 27% прибыли</h3>-->
			<!--					<p>Поставьте цель и зарабатывайте, получайте до 27% прибыли</p>-->
			<!--				</div>-->
			<!--				<div>-->
			<!--					<i class="icon-x text-[7px] text-center text-neutral" />-->
			<!--				</div>-->
			<!--			</div>-->
		</Header>
		<RouterLink to="/verify" class="btn btn-primary"
			>Проверить документ
		</RouterLink>

		<div v-if="investmentsStore.loading" class="container">
			<GoalsSkeleton v-for="i in 3" :key="i" />
		</div>
		<div v-else class="body my-4 container">
			<div
				class="flex flex-col space-y-3 items-start w-full"
				v-if="investments.length !== 0"
			>
				<div class="flex w-full items-center font-semibold justify-between">
					<h1 class="text-xl leading-[25px]">Ваши вклады</h1>
					<button
						@click="router.push('/goal-select-plan')"
						class="text-[#3680ff] text-[15px] leading-tight"
					>
						+ Добавить
					</button>
				</div>
				<Goal
					v-for="investment in investments"
					:key="investment.guid"
					:investment
				/>
				<!--				<pre class="text-[12px]">{{ investments[0] }}</pre>-->
			</div>
			<div v-else class="goalEmpty">
				<div class="goalEmptyIcon">
					<img src="@/assets/icons/no-purpose.svg" alt="no-purpose" />
				</div>
				<div class="goalEmptyTexts">
					<h3>У вас пока нет целей</h3>
					<p>
						Вы ничего не зарабатываете, <br />
						потому что не добавлены цели и не выбран тариф заработка
					</p>
				</div>
				<RouterLink to="/goal-add">
					<VButton variant="primary">Добавить вклад</VButton>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<style scoped lang="postcss">
.wrapper {
	@apply h-dvh flex flex-col overflow-y-auto;
}

.rocket {
	@apply inline-flex justify-center items-center size-[48px] rounded-[50%] bg-[#f4f4f5];
}

.content {
	@apply mt-2.5 flex flex-col items-center;
}

.contentBalance {
	@apply mt-1.5 text-[32px] leading-9 font-medium tracking-[-0.01em] text-center text-white;
	span {
		@apply opacity-50;
	}
}

.contentProfit {
	@apply mt-1.5 flex items-center gap-2 px-2.5 py-1 rounded-[20px] bg-[#3e23971f];

	svg {
		@apply size-[16px];
	}
}

.contentProfitTitle {
	@apply font-medium leading-[20px] text-[14px] text-left text-white;
}

.bottom {
	@apply mt-4 min-h-[74px] bg-white rounded-[16px] grid grid-cols-[48px,1fr,12px] gap-3.5 p-3.5 shadow-[0,4px,32px,0,#5b538129];
}

.bottomTexts {
	@apply flex flex-col gap-2;

	& > h3 {
		@apply font-semibold leading-[20px] text-[16px] text-left text-[#040415] tracking-[-0.19px];
	}
	& > p {
		@apply leading-[16px] text-[14px] text-left text-[#040415]/50;
	}
}

.goalEmpty {
	@apply pt-[105px] flex flex-col items-center justify-center gap-[16px];
}

.goalEmptyIcon {
	img {
		@apply w-full h-full object-contain;
	}
}

.goalEmptyTexts {
	@apply flex flex-col gap-[10px];
	& > h3 {
		@apply font-semibold leading-[24px] text-[20px] text-center text-[#040415];
	}
	& > p {
		@apply font-medium leading-[20px] text-[14px] text-center text-[#040415]/50 max-w-[315px];
	}
}

.body {
	@apply flex items-center justify-center;
}
</style>
