<script setup lang="ts">
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Icon, Card } from '@/components/Base'
import { AboutPlans } from '@/pages/goal/select-plan/components'
import { calculateProfitability, formatMoney } from '@/utils'
import { useStrategiesStore } from '@/stores/strategies.ts'
import { Currency, ITariff } from '@/types/strategies.type.ts'
import { useInvestmentsStore } from '@/stores/investments.ts'
import { BackButton, MainButton } from 'vue-tg'

const router = useRouter()
const investmentsStore = useInvestmentsStore()
const strategiesStore = useStrategiesStore()

const selectedPlan = ref(Currency.UZS)
const isCapitalized = ref(true)

const terms = computed(() => {
	return {
		[Currency.UZS]: strategiesStore.GET_ACTIVE_UZS_TARIFFS,
		[Currency.USD]: strategiesStore.GET_ACTIVE_USD_TARIFFS
	}
})

const selectedTerm = ref<{ [key in Currency]: ITariff | null }>({
	[Currency.UZS]: null,
	[Currency.USD]: null
})

const tariffTitle = (currency: string) => {
	if (currency === Currency.UZS) return 'Сумовый'
	else return 'Валютный'
}

const planValues = computed(() => {
	return {
		[Currency.UZS]: isCapitalized.value
			? terms.value[Currency.UZS].find(
					term =>
						term.currency === Currency.UZS &&
						selectedTerm.value[Currency.UZS]?.guid === term.guid
				)?.max_value
			: terms.value[Currency.UZS].find(
					term =>
						term.currency === Currency.UZS &&
						selectedTerm.value[Currency.UZS]?.guid === term.guid
				)?.start_value,
		[Currency.USD]: isCapitalized.value
			? terms.value[Currency.USD].find(
					term =>
						term.currency === Currency.USD &&
						selectedTerm.value[Currency.USD]?.guid === term.guid
				)?.max_value
			: terms.value[Currency.USD].find(term => term.currency === Currency.USD)
					?.start_value
	}
})

const plans = computed(() =>
	Object.keys(strategiesStore.GET_ACTIVE_TARIFFS_BY_CURRENCY)
)

const investAmount = computed(() =>
	selectedPlan.value === Currency.UZS ? 1e6 : 1e3
)

const handleTermChange = (term: ITariff) => {
	if (term.currency === Currency.UZS) selectedTerm.value[Currency.UZS] = term
	else selectedTerm.value[Currency.USD] = term
}

watch(
	selectedPlan,
	() => {
		selectedTerm.value[selectedPlan.value] = terms.value[selectedPlan.value][0]
	},
	{ immediate: true }
)

const createGoal = async () => {
	await investmentsStore.createInvestment({
		term: selectedTerm.value[selectedPlan.value]?.terms,
		strategy_id: strategiesStore.strategies[0].guid,
		tariff_id: selectedTerm.value[selectedPlan.value]?.guid
	})

	router.push({ path: '/goal-created', query: { plan: selectedPlan.value } })
}

onMounted(async () => {
	await strategiesStore.getTariffs({ limit: 100 })
	await strategiesStore.getStrategies()
	selectedTerm.value[selectedPlan.value] = terms.value[selectedPlan.value][0]
	selectedTerm.value[Currency.USD] = terms.value[Currency.USD][0]
})
</script>

<template>
	<div class="tariffBlock container">
		<div class="tariffCheckBlock">
			<h3 class="contentTitle">Выбор тарифа</h3>
			<div class="tariffList">
				<RadioGroup v-model="selectedPlan" :default-value="Currency.UZS">
					<Card v-for="(plan, index) in plans" :key="index" class="space-x-2">
						<label class="flex items-center" :for="`r-${index + 1}`">
							<div class="radioGroup">
								<div class="tariffItemDesc">
									<Icon :icon="plan" />
									<div>
										<h3>{{ tariffTitle(plan) }}</h3>
										<p>
											Партнерство
											{{
												plan === Currency.UZS
													? planValues[Currency.UZS]
													: planValues[Currency.USD]
											}}%
										</p>
									</div>
								</div>
							</div>
							<RadioGroupItem :id="`r-${index + 1}`" :value="plan" />
						</label>
					</Card>
				</RadioGroup>
			</div>
		</div>
		<label for="time">
			<div class="contentFormBlock">
				<div class="contentFormList overflow-x-auto no-scrollbar">
					<template
						v-for="(term, index) in terms[selectedPlan]"
						:key="term.guid"
					>
						<div
							v-if="selectedPlan === Currency.UZS || index === 0"
							:id="`term-${index + 1}`"
							class="contentFormListItem"
							:class="{
								active: selectedTerm[selectedPlan]?.guid === term.guid
							}"
							@click="handleTermChange(term)"
						>
							{{ term.terms }} мес
						</div>
					</template>
				</div>
			</div>
		</label>

		<div class="totalListItem">
			<div class="totalOther">
				<div class="totalOtherTexts">
					<h3>Оставлять прибыль на вкладе</h3>
					<p>
						Дивиденды реинвестируются <br />
						для увеличения прибыли
					</p>
				</div>
				<div>
					<Switch
						:checked="isCapitalized"
						@update:checked="isCapitalized = !isCapitalized"
					/>
				</div>
			</div>
		</div>
		<div class="py-4 flex flex-col gap-2">
			<Card class="flex gap-6 flex-col">
				<div class="flex items-center justify-between">
					<div
						class="flex items-center gap-2 text-neutral text-[13px] font-medium leading-[18px]"
					>
						<span class="text-[#3680FF] font-medium text-[32px] leading-[38px]">
							~{{
								calculateProfitability({
									isCapitalized,
									isDollar: selectedPlan === Currency.USD,
									tariff: selectedTerm[selectedPlan]!,
									initialAmount: investAmount
								}).forecast
							}}%
						</span>
						за весь срок
					</div>
					<i class="icon-info text-[18px] text-neutral/50" />
				</div>
				<div class="flex items-center justify-between">
					<div
						class="flex flex-col text-[13px] font-medium leading-[18px] text-neutral"
					>
						Если вложить
						<span class="text-black text-[16px] leading-[21px]">{{
							formatMoney(investAmount, 'ru-RU', selectedPlan)
						}}</span>
					</div>
					<div
						class="flex border justify-center items-center size-6 rounded-full bg-white"
					>
						<i class="icon-arrow-right text-[9px] text-neutral/50" />
					</div>

					<div
						class="flex flex-col text-[13px] font-medium leading-[18px] text-neutral"
					>
						Ваша прибыль
						<span class="text-[#10C44C] text-right text-[16px] leading-[21px]">
							+
							{{
								formatMoney(
									calculateProfitability({
										isCapitalized,
										isDollar: selectedPlan === Currency.USD,
										tariff: selectedTerm[selectedPlan]!,
										initialAmount: investAmount
									}).result,
									'ru-RR',
									selectedPlan
								)
							}}
						</span>
					</div>
				</div>
			</Card>

			<AboutPlans />
		</div>

		<div class="totalText">
			<span>Открывая вклад, вы соглашаетесь с </span>
			<span class="condition">условиями</span>
		</div>
	</div>
	<BackButton @click="() => router.push('/goal-add')" />
	<MainButton text="Открыть вклад" />
</template>

<style scoped lang="postcss">
.tariffBlock {
	display: flex;
	flex-direction: column;
}

.tariffCheckBlock {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding-bottom: 24px;
	border-bottom: 1px solid #0404150d;
}

.tariffList {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.radioGroup {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	grid-gap: 8px;
	padding-right: 30px;
}

.tariffItemDesc {
	display: flex;
	align-items: center;
	gap: 12px;
	font-weight: 500;
	font-size: 16px;
	line-height: 21px;
	p {
		@apply text-neutral text-[12px] leading-[16px];
	}
}

.totalText {
	font-weight: 500;
	font-size: 13px;
	line-height: 16px;
	color: #354259;
	margin-bottom: 16px;
	text-align: center;

	& span:nth-child(1) {
		opacity: 0.5;
	}
}
.condition {
	color: #3680ff;
}

.totalOtherTexts {
	@apply flex flex-col gap-1;

	h3 {
		color: #040415;
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;

		text-align: left;
	}
	p {
		color: #9aa3b3;
		font-size: 13px;
		line-height: 16px;
		font-weight: 500;
		text-align: left;
	}
}

.totalListItem {
	@apply py-4;
	border-bottom: 1px solid #0404150d;
}

.contentTitle {
	@apply py-4;
	font-weight: 600;
	line-height: 21px;
	text-align: center;
	color: #040415;
}

.contentFormBlock {
	border-bottom: 1px solid #0404150d;
}

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
.contentFormList {
	display: flex;
	gap: 10px;
	padding: 16px 0;

	&:first-child {
		@apply pl-3;
	}
}
.totalOther {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}
</style>
