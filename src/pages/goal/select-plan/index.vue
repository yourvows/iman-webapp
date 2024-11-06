<script setup lang="ts">
import { Switch } from '@/components/Form'
import { onMounted, ref, watch } from 'vue'
import { useTelegram } from '@/composables/useTelegram.ts'
import { useRouter } from 'vue-router'
import { Icon } from '@/components/Base'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { terms, plans } from '@/data/data.ts'

const { MainButton, BackButton } = useTelegram()
const router = useRouter()

const percentage = ref(27)
const selectedId = ref(3)
const income = ref('0')
const amount = ref(null)
const term = ref(24)
const isChecked = ref(false)

const handleTermChange = (id: number, percent: number) => {
	selectedId.value = id
	percentage.value = percent
	calculateIncome(amount.value, percentage.value)
}

const calculateIncome = (amount: number, percentage: number) => {
	const calculatedIncome = (amount * percentage) / 100
	income.value = calculatedIncome.toString()
}

const showModalAim = () => {
	// emit('show-modal-aim')
}

watch(selectedId, () => {
	if (selectedId.value === 1) {
		term.value = 12
	} else if (selectedId.value === 2) {
		term.value = 18
	} else if (selectedId.value === 3) {
		term.value = 24
	}
})

onMounted(() => {
	MainButton.text = 'Открыть вклад'
	MainButton.show()
	MainButton.onClick(showModalAim)
	BackButton.onClick(() => router.push('/goal-add'))
})
</script>

<template>
	<div class="tariffBlock container">
		<div class="tariffCheckBlock">
			<h3 class="contentTitle">Выбор тарифа</h3>
			<div class="tariffList">
				<label
					v-for="(plan, index) in plans"
					:key="index"
					:for="`plan-${index + 1}`"
					class="tariffItem card"
				>
					<input type="radio" :id="`plan-${index + 1}`" name="plan" />
					<div class="radioGroup">
						<div class="tariffItemDesc">
							<Icon :icon="plan.icon" />

							<div>
								<h3>{{ plan.title }}</h3>
								<p>{{ plan.description }}</p>
							</div>
						</div>
					</div>
					<span class="radioIcon"></span>
				</label>
			</div>
		</div>
		<label for="time">
			<div class="contentFormBlock">
				<div class="contentFormList">
					<div
						v-for="(term, index) in terms"
						:key="term.id"
						:id="`term-${index + 1}`"
						class="contentFormListItem"
						:class="{ active: selectedId === index + 1 }"
						@click="handleTermChange(index + 1, term.percent)"
					>
						{{ term.title }}
					</div>
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
					<Switch v-model="isChecked" />
				</div>
			</div>
		</div>
		<div class="py-4 flex flex-col gap-2">
			<div class="card flex gap-6 flex-col">
				<div class="flex items-center justify-between">
					<div
						class="flex items-center gap-2 text-neutral text-[13px] font-medium leading-[18px]"
					>
						<span class="text-[#3680FF] font-medium text-[32px] leading-[38px]">
							~{{ percentage }}%
						</span>
						за весь срок
					</div>
					<Drawer>
						<DrawerTrigger>
							<i class="icon-info text-[18px] text-neutral/50" />
						</DrawerTrigger>
						<DrawerContent>
							<div class="container">
								<div class="flex gap-[8px]">
									<Icon icon="flag-uz" size="32px" />
									<Icon icon="flag-usa-circle" size="32px" />
								</div>

								<div class="border-b py-4">
									<h3 class="font-semibold leading-[21px] mb-2">
										Чем отличаются тарифы?
									</h3>
									<p
										class="text-[15px] text-neutral font-medium leading-[20px]"
									>
										Вы можете открыть вклад в узбекских сумах со ставкой до ~27%
										в год или в долларах США со ставкой ~13%
									</p>
								</div>
								<div class="py-4">
									<h3 class="font-semibold leading-[21px] mb-2">
										Чем отличаются тарифы?
									</h3>
									<p
										class="text-[15px] text-neutral font-medium leading-[20px]"
									>
										Вы можете открыть вклад в узбекских сумах со ставкой до ~27%
										в год или в долларах США со ставкой ~13%
									</p>
								</div>
							</div>
						</DrawerContent>
					</Drawer>
				</div>
				<div class="flex items-center justify-between">
					<div
						class="flex flex-col text-[13px] font-medium leading-[18px] text-neutral"
					>
						Если вложить
						<span class="text-black text-[16px] leading-[21px]"
							>1 000 000 сум</span
						>
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
						<span class="text-[#10C44C] text-right text-[16px] leading-[21px]"
							>+540 000</span
						>
					</div>
				</div>
			</div>
			<div class="card flex justify-between items-center gap-3">
				<div
					class="flex w-[90%] items-center gap-[18px] font-medium text-[15px] leading-[20px]"
				>
					<i class="icon-suitcase text-blue text-[18px]" />Как мы управляем
					вашими деньгами?
				</div>
				<i class="icon-chevron-right text-neutral/50" />
			</div>
			<div class="card flex justify-between items-center gap-3">
				<div
					class="flex w-[90%] items-center gap-[18px] font-medium text-[15px] leading-[20px]"
				>
					<i class="icon-calculator text-blue text-[18px]" />Калькулятор прибыли
				</div>
				<i class="icon-chevron-right text-neutral/50" />
			</div>
		</div>

		<div class="totalText">
			<span>Открывая вклад, вы соглашаетесь с </span>
			<span class="condition">условиями</span>
		</div>
	</div>
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

.card {
	@apply bg-neutral/[0.06] rounded-2xl p-4;
}
.tariffItem {
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	position: relative;

	& input[type='radio'] {
		@apply hidden;
	}

	& input[type='radio']:checked ~ .radioIcon {
		@apply border-[#3680ff] border-solid border-[3px];
	}

	& input[type='radio']:checked ~ .radioIcon:after {
		@apply opacity-100;
	}
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

.radioIcon {
	box-sizing: border-box;
	position: absolute;
	top: 50%;
	right: 16px;
	transform: translateY(-50%);
	height: 20px;
	width: 20px;
	border-radius: 50%;
	border: 2px solid #999999ff;
	transition: 0.2s all 0s;

	&:after {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		content: '';
		width: 11.4px;
		height: 11.4px;
		border-radius: 50%;
		opacity: 0;
		background-color: #3680ff;
		transition: all 0.2s;
	}
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
	@apply py-4;
	border-bottom: 1px solid #0404150d;
}

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
.contentFormList {
	display: flex;
	gap: 10px;
}
.totalOther {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}
</style>
