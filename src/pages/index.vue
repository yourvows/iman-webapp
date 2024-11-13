<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { Token } from '@/types/enums.ts'
import { useWebAppCloudStorage } from 'vue-tg'

const router = useRouter()

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
	<div class="splash bg-gradient-to-b from-[#0467FF] to-[#79A5FC] bg-blue">
		<img src="@/assets/icons/iman-logo.svg" alt="iman-logo" />

		<p
			class="absolute bottom-[48px] text-center text-white text-lg font-semibold leading-[23px]"
		>
			Халяльные инвестиции <br />
			начинаются здесь
		</p>
	</div>
</template>

<style lang="postcss" scoped>
.splash {
	@apply z-[200] w-full h-full fixed top-0 left-0 flex items-center justify-center;
}
</style>
