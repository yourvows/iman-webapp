<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getCookie } from '@/utils/cookie.ts'
import { SplashScreen } from '@/components'

const router = useRouter()
const pin = ref<string | null>(null)
const accessToken = ref<string | null>(null)
const refreshToken = ref<string | null>(null)

function redirectToRegister() {
	const timer = setTimeout(() => {
		router.push('/registration/pin')
	}, 1000)

	return () => clearTimeout(timer)
}

function redirectToPin() {
	const timer = setTimeout(() => {
		router.push('/login/pin')
	}, 1000)

	return () => clearTimeout(timer)
}

onMounted(() => {
	if (typeof window !== 'undefined') {
		pin.value = localStorage.getItem('pinCode')
		accessToken.value = getCookie('accessToken')
		refreshToken.value = getCookie('refreshToken')
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
	<div class="container">
		<SplashScreen />
	</div>
</template>

<style lang="scss" scoped>
.container {
	z-index: 200;
	width: 100%;
	height: 100%;
	background-color: white;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
