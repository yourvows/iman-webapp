<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useTelegram } from '@/composables/useTelegram.ts'
import router from '@/router'
// import ModalAim from '../components/ModalAim.vue'

const { MainButton, BackButton } = useTelegram()

const modal = ref(false)
const modalAim = ref(false)
const modalAnswer = ref(false)

const goalAbout = [
	{
		icon: 'calendar',
		title: '27% годовых',
		description: 'Ставка без дополнительных условий, трат и скрытых условий'
	},
	{
		icon: 'money',
		title: 'Выплачиваем каждый месяц',
		description: 'Получайте прибыль каждый месяц первого числа'
	},
	{
		icon: 'deal',
		title: 'Помогаете людям',
		description:
			'Средства идут на помощь людям получать товары и услуги без нагрузок на финансовое состояние (Риба)'
	},
	{
		icon: 'secure',
		title: 'Пополняйте когда угодно',
		description:
			'Вы можете пополнять вклад в любой момент, увеличивая вашу прибыль'
	}
]

const showModalAim = () => {
	modal.value = false
	modalAim.value = true
}

const showModalAnswer = () => {
	modalAim.value = false
	modalAnswer.value = true
}

watch(
	() => modal.value,
	() => {
		if (modal.value) MainButton.hide()
		else MainButton.show()
	}
)
onMounted(() => {
	MainButton.show()
	BackButton.show()
	BackButton.onClick(() => router.push('/home'))
	MainButton.onClick(() => router.push('/goal-select-plan'))
})
</script>

<template>
	<div class="wrapper">
		<div class="top">
			<img src="@/assets/images/coins.png" alt="coins" />
		</div>
		<div class="body container">
			<div class="title">О вкладе</div>
			<div class="contentWrapperBox contentWrapperHistory">
				<ul class="featuresList">
					<li
						v-for="(about, index) in goalAbout"
						:key="index"
						class="featuresListItem"
					>
						<div class="featuresListItemIcon">
							<i :class="`icon-${about.icon}`" class="text-blue" />
						</div>
						<div class="featuresListItemTexts">
							<h3>{{ about.title }}</h3>
							<p>{{ about.description }}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!--		<ModalSelectPlan-->
		<!--			@show-modal-aim="showModalAim"-->
		<!--			:is-open="modal"-->
		<!--			@close="modal = false"-->
		<!--		/>-->
		<!--		<ModalAim :is-open="modalAim" @close="modalAim = false" />-->
	</div>
</template>

<style scoped lang="postcss">
.wrapper {
	@apply flex items-start justify-start flex-col w-full h-screen overflow-hidden overflow-y-scroll;
}
.body {
	@apply flex flex-col mt-6 gap-7;
}
.top {
	@apply w-full h-1/3 bg-[url('@/assets/images/home-bg-2.png')] bg-no-repeat bg-cover bg-center;

	& img {
		@apply w-full h-full object-cover;
	}
}
.title {
	@apply font-semibold text-[20px] leading-[25px];
}

.featuresListItemIcon {
	@apply flex items-center justify-center size-[42px] rounded-full bg-[#f5f7fa];
}
.featuresListItemTexts {
	@apply flex flex-col gap-1;

	h3 {
		@apply text-[#040415] font-semibold text-left leading-[20px];
	}
	p {
		@apply font-medium text-left text-[13px] leading-[18px] text-[#9aa3b3] max-w-[283px];
	}
}
.featuresListItem {
	@apply flex items-center gap-3;
}

.featuresList {
	@apply flex flex-col gap-5;
}
</style>
