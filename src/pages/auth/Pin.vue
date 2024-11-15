<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
	useWebAppCloudStorage,
	useWebAppHapticFeedback,
	useWebAppBiometricManager,
	BiometricManager
} from 'vue-tg'

const router = useRouter()
const route = useRoute()
const { setStorageItem, getStorageItem } = useWebAppCloudStorage()
const { requestBiometricAccess, authenticateBiometric } =
	useWebAppBiometricManager()
const { selectionChanged } = useWebAppHapticFeedback()

const pin = ref('')
const setPin = ref('')
const isWrong = ref(false)
const isEnter = ref(false)
const activeButton = ref<null | number>(null)
const payload = ref(false)
let pressTimeout: NodeJS.Timeout | null = null

const handleNumberClick = (number: string) => {
	if (pin.value.length < 4) {
		pin.value = pin.value + number
	}
}

const handleDelete = () => {
	pin.value = pin.value.slice(0, -1)
}

const handleKeyPress = (e: KeyboardEvent) => {
	if (e.key >= '0' && e.key <= '9') {
		handleNumberClick(e.key)
	} else if (e.key === 'Backspace') {
		handleDelete()
	}
}

function press(num: number) {
	if (pressTimeout) clearTimeout(pressTimeout)
	activeButton.value = num
	pressTimeout = setTimeout(() => {
		activeButton.value = null
		pressTimeout = null
	}, 200)
}

watch(payload, () => {
	if (payload.value) router.push('/home')
})

watch(pin, () => {
	selectionChanged()
	isWrong.value = false
	if (pin.value.length !== 4) return

	if (isEnter.value) {
		if (pin.value === setPin.value) router.push('/home')
		else isWrong.value = true
	} else {
		setStorageItem('pinCode', pin.value)

		router.push('/home')
	}
})
function handleInit() {
	if (route.path === '/auth/pin') {
		requestBiometricAccess({ reason: 'Enter PIN' }, () => {})
		authenticateBiometric({ reason: 'Enter PIN' }, isAccessGranted => {
			payload.value = isAccessGranted
		})
	}
}

onMounted(async () => {
	if (route.path === '/auth/pin') {
		isEnter.value = true
		setPin.value = (await getStorageItem('pinCode')) as string
	}

	window.addEventListener('keydown', handleKeyPress)
})
onUnmounted(() => {
	window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
	<div class="wrapper container">
		<h1 v-if="!isEnter" class="title">Установите PIN-код</h1>
		<h1 v-else class="title">Введите пароль PIN-код</h1>

		<p v-if="!isEnter" class="subtitle">
			Этот PIN-код будет использоваться <br />для входа в приложение
		</p>
		<p v-else class="subtitle">Для входа введите придуманный ранее код</p>
		<div class="pinIndicators" :class="{ 'animate-shake': isWrong }">
			<div
				v-for="(_, index) in Array(4)"
				:key="index"
				class="pinIndicator"
				:class="{ filled: index < pin.length, '!bg-[#F93C65]': isWrong }"
			/>
		</div>

		<div
			class="w-[288px] flex justify-center items-start flex-wrap gap-[24px] relative"
		>
			<button
				v-for="number in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]"
				:key="number"
				class="font-semibold w-[80px] h-[80px] bg-neutral/20 transition-all delay-[20ms] rounded-full text-[28px] leading-[34px] flex items-center justify-center"
				:class="{ 'bg-neutral/50': activeButton === number }"
				@touchstart="press(number)"
				@click="handleNumberClick(number.toString())"
			>
				{{ number }}
			</button>

			<button
				class="font-semibold w-[80px] h-[80px] transition-all delay-[20ms] rounded-full text-[28px] leading-[34px] flex items-center justify-center absolute right-0 bottom-0"
				:class="[
					{
						'bg-neutral/50': activeButton === -1,
						'opacity-0 touch-none': !pin.length
					}
				]"
				@touchstart="press(-1)"
				@click="handleDelete"
			>
				<i class="icon-remove text-[23px]" />
			</button>
			<button
				v-if="isEnter"
				class="font-semibold w-[80px] h-[80px] transition-all delay-[20ms] rounded-full text-[28px] leading-[34px] flex items-center justify-center absolute left-0 bottom-0"
				:class="[
					{
						'bg-neutral/50': activeButton === -2
					}
				]"
				@touchstart="press(-2)"
				@click="handleInit"
			>
				<i class="icon-face-id text-[23px]" />
			</button>
		</div>
		<BiometricManager @init="handleInit" />
	</div>
</template>
<style lang="postcss" scoped>
.wrapper {
	@apply flex items-center justify-center flex-col w-full h-screen overflow-hidden py-[30px] overflow-y-auto relative;
}

.title {
	@apply w-full font-semibold text-[26px] mb-2.5;
}

.subtitle {
	@apply w-full font-medium text-neutral text-[14px] leading-[20px] mb-12;
}

.pinIndicators {
	@apply flex items-center justify-center gap-[15px] w-full;

	&.wrong .pinIndicator {
		@apply border-[#FF00007E] border border-solid bg-[#FF00005B] relative animate-shake;
	}
}

.pinIndicator {
	@apply w-[12px] h-[12px] rounded-full bg-black/10 mb-12;

	&.filled {
		@apply bg-[#3680FF];
	}
}
</style>
