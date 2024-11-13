<script setup lang="ts">
import { VButton } from '@/components/Base'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { Currency } from '@/types/strategies.type.ts'
import { useTelegram } from '@/composables/useTelegram.ts'

const router = useRouter()
const route = useRoute()
const { MainButton, BackButton } = useTelegram()

onMounted(() => {
	MainButton.hide()
	BackButton.onClick(() => router.push('/home'))
})
</script>

<template>
	<div
		class="container h-svh bg-blue flex flex-col items-center justify-between gap-10 py-10"
	>
		<div class="flex items-center justify-center flex-col gap-5">
			<div
				class="size-[71px] flex items-center justify-center rounded-full bg-white/10 border border-white backdrop-blur-[15px]"
			>
				<i class="icon-check text-white" />
			</div>
			<div class="font-semibold text-center">
				<h1 class="text-white text-2xl leading-[30px] mb-3">Вклад открыт!</h1>
				<p class="opacity-70 text-white text-[15px] leading-tight">
					Пополните его, и прибыль начнёт <br />
					начисляться
				</p>
			</div>
			<div
				v-if="route.query.plan === Currency.USD"
				class="p-4 bg-white/10 rounded-2xl shadow-[0px,0px,20px,0px,rgba(110,132,255,0.15)] flex-col justify-start items-start gap-4 inline-flex"
			>
				<h3 class="text-white text-base font-semibold leading-[21px]">
					Прибыль начисляется в сумах, но мы покроем разницу курса 👌
				</h3>
				<div class="text-white text-[15px] font-semibold leading-tight">
					<i class="icon-lamp" /> Почему в сумах?
				</div>
			</div>
		</div>
		<div class="w-full space-y-3">
			<VButton variant="white" class="w-full">Пополнить</VButton>
			<VButton variant="transparent" class="w-full">Пополнить позже</VButton>
		</div>
	</div>
</template>
