<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pin = ref('')

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

watch(pin, () => {
	if (pin.value.length === 4) {
		localStorage.setItem('pinCode', pin.value)

		router.push('/home')
	}
})

onMounted(() => {
	window.addEventListener('keydown', handleKeyPress)
})
onUnmounted(() => {
	window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
	<div class="container">
		<h1 class="title">Установите PIN-код</h1>

		<p class="subtitle">
			Этот PIN-код будет использоваться <br />для входа в приложение
		</p>
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
				<svg
					width="28"
					height="28"
					viewBox="0 0 28 28"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_4564_18208)">
						<path
							d="M23.333 7C23.6424 7 23.9392 7.12292 24.158 7.34171C24.3767 7.5605 24.4997 7.85725 24.4997 8.16667V19.8333C24.4997 20.1428 24.3767 20.4395 24.158 20.6583C23.9392 20.8771 23.6424 21 23.333 21H10.4997L4.66633 15.1667C4.37936 14.8458 4.2207 14.4305 4.2207 14C4.2207 13.5695 4.37936 13.1542 4.66633 12.8333L10.4997 7H23.333Z"
							stroke="#040415"
							stroke-width="1.75"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M18.6667 11.667L14 16.3337M14 11.667L18.6667 16.3337L14 11.667Z"
							stroke="#040415"
							stroke-width="1.75"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</g>
					<defs>
						<clipPath id="clip0_4564_18208">
							<rect width="28" height="28" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</button>
		</div>
	</div>
</template>
<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.container {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	@include resa('padding', 30px);
	@include resa('padding-top', 30px);
	@include resa('padding-bottom', 24px);
	position: relative;
	overflow-y: auto;
}

.title {
	width: 100%;
	font-weight: 600;
	@include resa('font-size', 26px);
	@include resa('margin-bottom', 10px);
	color: black;
}

.subtitle {
	width: 100%;
	font-weight: 500;
	@include resa('font-size', 14px);
	@include resa('line-height', 22px);
	@include resa('margin-bottom', 50px);
	color: black;
}

.pinIndicators {
	display: flex;
	align-items: center;
	justify-content: center;
	@include resa('gap', 15px);
	width: 100%;

	&.wrong .pinIndicator {
		border: solid #ff00007e;
		@include res('border-width', 1px);
		background-color: #ff00005b;
		position: relative;
		animation: shake 200ms linear forwards;
	}
}

@keyframes shake {
	0% {
		top: 2px;
		left: 2px;
	}
	25% {
		top: -2px;
		left: 2px;
	}
	50% {
		top: 2px;
		left: -2px;
	}
	75% {
		top: -2px;
		left: -2px;
	}
	100% {
		top: 0;
		left: 0;
	}
}

.pinIndicator {
	@include resa('width', 12px);
	@include resa('height', 12px);
	border-radius: 50%;
	background-color: black;
	opacity: 0.1;
	@include resa('margin-bottom', 50px);

	&.filled {
		background-color: #3680ff;
		opacity: 1;
	}
}

.numberPad {
	@include resa('width', 288px);
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-wrap: wrap;
	@include resa('gap', 24px);
	position: relative;

	.numberButton {
		font-weight: 600;
		@include resa('width', 80px);
		@include resa('height', 80px);
		border-radius: 50%;
		background-color: hsla(240, 68%, 5%, 0.05);
		@include resa('font-size', 28px);
		@include resa('line-height', 34px);
		display: flex;
		align-items: center;
		justify-content: center;
		color: black;
	}

	.deleteButton {
		font-weight: 600;
		@include resa('width', 80px);
		@include resa('height', 80px);
		border-radius: 50%;
		background-color: hsla(240, 68%, 5%, 0.05);
		@include resa('font-size', 28px);
		@include resa('line-height', 34px);
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right: 0;
		bottom: 0;
	}
}
</style>
