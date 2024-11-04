<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getCookie } from '@/utils/cookie.ts'
import { SplashScreen } from '@/components'
import { Token } from '@/types/enums.ts'

const router = useRouter()
const pin = ref<string | null>(null)
const accessToken = ref<string | null>(null)
const refreshToken = ref<string | null>(null)

function redirectToRegister() {
	const timer = setTimeout(() => {
		router.push('/auth/login')
	}, 1000)

	return () => clearTimeout(timer)
}

function redirectToPin() {
	const timer = setTimeout(() => {
		router.push('/auth/pin')
	}, 1000)

	return () => clearTimeout(timer)
}

onMounted(() => {
	if (typeof window !== 'undefined') {
		pin.value = localStorage.getItem('pinCode')
		accessToken.value = getCookie(Token.AccessToken)
		refreshToken.value = getCookie(Token.RefreshToken)
	}

	if (window.Telegram && window.Telegram.WebApp) {
		const webApp = window.Telegram.WebApp

		webApp.expand()
		webApp.disableClosingConfirmation()
	}

	if (pin.value && accessToken && refreshToken) {
		redirectToPin()
		console.log('Проверка пин-кода успешна')
	} else {
		redirectToRegister()
		console.log('Проверка пин-кода не успешна')
	}
})
</script>

<template>
	<div class="splash">
		<SplashScreen />
	</div>
</template>

<style lang="postcss" scoped>
.splash {
	@apply z-[200] w-full h-full bg-white fixed top-0 left-0 flex items-center justify-center;
}
</style>
