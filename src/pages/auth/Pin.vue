<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWebAppCloudStorage } from 'vue-tg'

const router = useRouter()
const route = useRoute()
const { setStorageItem, getStorageItem } = useWebAppCloudStorage()

const pin = ref('')
const isEnter = ref(false)

const handleNumberClick = (number: string) => {
	if (pin.value.length < 4) {
		pin.value = pin.value + number
	}
}

const handleDelete = () => {
	pin.value = pin.value.slice(0, -1)
}

const handleKeyPress = e => {
	if (e.key >= '0' && e.key <= '9') {
		handleNumberClick(e.key)
	} else if (e.key === 'Backspace') {
		handleDelete()
	}
}

watch(pin, async () => {
	if (pin.value.length !== 4) return

	if (isEnter.value) {
		const code = await getStorageItem('pinCode')
		console.log(code)
		if (pin.value === code) router.push('/home')
	} else {
		await setStorageItem('pinCode', pin.value)

		router.push('/home')
	}
})

onMounted(() => {
	if (route.path === '/auth/pin') {
		isEnter.value = true
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
		<div class="pinIndicators">
			<div
				v-for="(_, index) in Array(4)"
				:key="index"
				class="pinIndicator"
				:class="{ filled: index < pin.length }"
			/>
		</div>

		<div class="numberPad">
			<button
				v-for="number in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]"
				:key="number"
				class="numberButton"
				@click="handleNumberClick(number.toString())"
			>
				{{ number }}
			</button>

			<button class="deleteButton" @click="handleDelete">
				<i class="icon-remove" />
			</button>
		</div>
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

.numberPad {
	@apply w-[288px] flex justify-center items-start flex-wrap gap-[24px] relative;

	.numberButton {
		@apply font-semibold w-[80px] h-[80px] hover:bg-neutral/20 transition-all delay-100 rounded-full text-[28px] leading-[34px] flex items-center justify-center;
	}

	.deleteButton {
		@apply font-semibold w-[80px] h-[80px] hover:bg-neutral/20 transition-all delay-100 rounded-full text-[28px] leading-[34px] flex items-center justify-center absolute right-0 bottom-0;
		i {
			@apply text-[23px];
		}
	}
}
</style>
