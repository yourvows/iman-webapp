<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { SplashScreen } from '@/components'
import { Token } from '@/types/enums.ts'
import { useTelegram } from '@/composables/useTelegram.ts'
import { useWebAppCloudStorage } from 'vue-tg'

const router = useRouter()
const { webApp } = useTelegram()
const { getStorageItems } = useWebAppCloudStorage()

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

onMounted(async () => {
	const res = await getStorageItems([
		Token.AccessToken,
		Token.RefreshToken,
		'pinCode'
	])

	pin.value = res.pinCode
	accessToken.value = res.accessToken
	refreshToken.value = res.refreshToken

	webApp.expand()
	webApp.disableClosingConfirmation()

	const isLoggedIn = accessToken.value && refreshToken.value && pin.value
	if (isLoggedIn) {
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
