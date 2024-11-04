<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { vMaska } from 'maska/vue'
import { Icon, VButton } from '@/components/Base'

const emit = defineEmits<{
	(e: 'action', action: 'next' | 'back'): void
}>()

const authStore = useAuthStore()

const isValid = ref(true)
const isKeyboardOpen = ref(false)

function nextPage() {
	if (validatePhoneNumber(authStore.phoneNumber)) {
		sendOtpRequest(authStore.phoneNumber)
	} else {
		isValid.value = false
	}
}

function validatePhoneNumber(phoneNumber: string) {
	const cleanedNumber = phoneNumber.replace(/\D/g, '')

	return cleanedNumber.length === 9
}

async function sendOtpRequest(number: string) {
	const formattedNumber = `998${number.replace(/\D/g, '')}`

	await authStore.sendOtp({
		auth_type: 1,
		email: '',
		phone_number: formattedNumber
	})
	emit('action', 'next')
}
</script>

<template>
	<div
		class="h-screen pt-4 container"
		:class="isKeyboardOpen ? 'keyboardOpen' : ''"
	>
		<h1 class="title">Введите свой телефон</h1>
		<p class="subtitle">
			Если же у вас нет номера, но вы <br />можете войти по электронной почте
		</p>
		<div class="numberInput">
			<p><Icon icon="flag-uz" />+998</p>
			<input
				v-maska="'## ### ## ##'"
				v-model="authStore.phoneNumber"
				placeholder="Номер телефона"
				type="tel"
				inputmode="numeric"
				:class="!isValid ? '!border-red-500 !border !border-solid' : ''"
			/>
		</div>

		<p v-if="!isValid" class="error">Неверный номер телефона</p>

		<div class="bottom">
			<VButton @click="nextPage">Продолжить</VButton>
			<p class="text">
				Нажимая на кнопку Продолжить, <br />
				вы соглашаетесь с <span class="text-blue">условиями</span> и
				<span class="text-blue">оффертой</span>
			</p>
		</div>
	</div>
</template>

<style scoped lang="postcss">
.title {
	@apply font-semibold mb-5 text-black text-2xl leading-7;
}

.subtitle {
	@apply font-medium mb-4 text-neutral text-sm leading-5;
}

.numberInput {
	@apply flex items-center gap-2 w-full h-16;

	p {
		@apply h-full gap-1.5 p-3.5 bg-[#f4f4f5] flex items-center justify-center rounded-2xl font-medium;
	}

	input {
		@apply h-full bg-[#f4f4f5] rounded-2xl font-medium border-none outline-none p-3.5;
	}
}

.bottom {
	@apply absolute left-1/2 bottom-5 flex transform -translate-x-1/2 flex-col items-center justify-center gap-2.5 min-w-[315px];

	.text {
		@apply text-center text-black font-medium text-[12px] leading-4;
	}
}
.error {
	@apply text-[12px] leading-4 mt-1 pl-1 text-[#F93C65];
}
</style>
