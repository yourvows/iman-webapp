<script setup lang="ts">
import { Modal, VButton } from '@/components/Base'
import { Switch } from '@/components/Form'
import { ref, watch } from 'vue'

defineProps<{
	isOpen: boolean
}>()

const emit = defineEmits<{
	(e: 'close'): void
	(e: 'show-modal-aim'): void
}>()

const percentage = ref(27)
const selectedId = ref(3)
const income = ref('0')
const amount = ref(null)
const term = ref(24)
const isChecked = ref(false)

const terms = [
	{
		id: 12,
		title: '12 мес',
		percent: 15
	},
	{
		id: 18,
		title: '18 мес',
		percent: 20
	},
	{
		id: 24,
		title: '24 мес',
		percent: 27
	}
]

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
	emit('show-modal-aim')
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
</script>

<template>
	<Modal @close="$emit('close')" :is-open>
		<div class="tariffBlock">
			<i class="icon-flag-uz !text-[24px]" />

			<div class="tariffCheckBlock">
				<h3 class="contentTitle">Выберите тариф</h3>
				<div class="tariffList">
					<label for="tariff1" class="tariffItem">
						<input type="radio" id="tariff1" name="tariff" />
						<div class="radioGroup">
							<div class="tariffItemDesc">
								<img src="../../../assets/icons/flag-circle.svg" alt="" />
								Сумовый
							</div>
							<div class="tariffItemPercent">~27%</div>
						</div>
						<span class="radioIcon"></span>
					</label>
					<label for="tariff2" class="tariffItem">
						<input type="radio" id="tariff2" name="tariff" />
						<div class="radioGroup">
							<div class="tariffItemDesc">
								<img src="../../../assets/icons/flag-usa-circle.svg" alt="" />
								Валютный
							</div>
							<div class="tariffItemPercent">~13%</div>
						</div>
						<span class="radioIcon"></span>
					</label>
				</div>
				<div class="tariffDesc">
					Если вы вложите 1 000 000 сум, то прибыль будет составлять ~270 000
					сум
				</div>
			</div>
			<label htmlFor="time">
				<h3 class="contentTitle">Выберите срок</h3>
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
					<div
						class="contentFormPersentage"
						:class="{ active: percentage > 0 }"
					>
						~{{ percentage }}%
					</div>
				</div>
			</label>
			<div class="totalList">
				<div class="totalListItem">
					<div class="totalOther">
						<div class="totalOtherTexts">
							<h3>Капитализация</h3>
							<p>Прибыль увеличивается, потому что находится в обороте</p>
						</div>
						<div>
							<Switch v-model="isChecked" />
						</div>
					</div>
				</div>
			</div>
			<div>
				<VButton variant="primary" @click="showModalAim">
					Открыть вклад
				</VButton>
				<div class="totalText">
					<span>Открывая вклад, вы соглашаетесь с </span>
					<span class="condition">условиями</span>
				</div>
			</div>
		</div>
	</Modal>
</template>

<style scoped lang="postcss">
.tariffBlock {
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 24px;
}

.tariffCheckBlock {
	display: flex;
	flex-direction: column;
	gap: 16px;
	box-sizing: border-box;
	padding-bottom: 24px;
	border-bottom: 1px solid #0404150d;
}

.tariffList {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.tariffDesc {
	font-weight: 500;
	font-size: 15px;
	line-height: 20px;
	color: #828da1;
}

.tariffItem {
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 16px;
	border-radius: 16px;
	background-color: rgba(244, 244, 245, 1);
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
	svg {
		@apply !size-[32px];
	}
}

.tariffItemPercent {
	font-weight: 600;
	font-size: 16px;
	line-height: 21px;
}

.totalText {
	display: block;
	font-weight: 500;
	font-size: 13px;
	line-height: 16px;
	color: #354259;
	margin-top: 16px;
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

.contentTitle {
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	text-align: left;
	color: #040415;
}

.contentFormBlock {
	display: flex;
	gap: 27px;
	align-items: center;
	margin-top: 16px;
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
