<script setup lang="ts">
import { OTP } from '@/components/Form'
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { maskPhoneNumber } from '@/utils'
import { useTelegram } from '@/composables/useTelegram.ts'

const emit = defineEmits<{
	(e: 'action', action: 'next' | 'back'): void
}>()

const { BackButton, MainButton } = useTelegram()
const authStore = useAuthStore()

const secondsLeft = ref(60)
const isOtpInvalid = computed(() => authStore.otpInfo.otp_invalid)

const disableError = () => (authStore.otpInfo.otp_invalid = false)

const goBack = () => emit('action', 'back')

function onComplete(code: string) {
	authStore
		.confirmOtp({
			code,
			otp_guid: authStore.otpInfo.otp_guid
		})
		.then(() => emit('action', 'next'))
}

onMounted(() => {
	if (MainButton.isVisible) {
		MainButton.hide()
	}
	BackButton.show()
	BackButton.onClick(goBack)

	const timer = setInterval(() => {
		if (secondsLeft.value > 0) {
			secondsLeft.value = secondsLeft.value - 1
		}
	}, 1000)

	return () => clearInterval(timer)
})
</script>

<template>
	<div class="wrapper container">
		<div class="header">
			<h1 class="title">Введите код</h1>
			<p class="info">
				Мы отправили код на номер <br />
				+998 {{ maskPhoneNumber(authStore.phoneNumber) }}
			</p>
		</div>

		<div
			class="codeInputContainer"
			:class="[{ 'animate-shake': isOtpInvalid }]"
		>
			<OTP
				:error="isOtpInvalid"
				@change="disableError"
				@complete="onComplete"
				:fields="5"
			/>
		</div>
		<p v-if="secondsLeft > 0" class="resend">
			Отправить повторно через 00:{{ secondsLeft }}
		</p>
		<a v-else href="#!" class="backBtn" type="button"
			>Вернуться назад к заполнению номера</a
		>

		<div class="helpContainer">
			<button class="helpButton">Проблемы со входом?</button>
		</div>
	</div>
</template>

<style scoped lang="postcss">
.wrapper {
	@apply flex justify-start flex-col w-full h-screen overflow-hidden pb-10 pt-[16px];
}

.header {
	@apply w-full flex flex-col items-start justify-start;
}

.title {
	@apply font-semibold text-2xl mb-2.5;
}

.info {
	@apply font-medium text-[14px] leading-5 text-neutral mb-1;
}

.resend {
	@apply font-medium text-[14px] leading-6 mb-9 opacity-50;
}

.codeInputContainer {
	@apply h-[64px] space-x-2 my-6;
}

.helpContainer {
	@apply absolute bottom-[20px];

	button {
		@apply text-[#04041566] font-medium text-[14px] leading-6;
	}
}

.backButton {
	@apply w-[30px] h-[30px] border-none outline-none top-[24px] left-[24px];
}

.backBtn {
	@apply font-medium text-[#32C2FB]  text-[14px] leading-6 mb-8;
}
</style>
