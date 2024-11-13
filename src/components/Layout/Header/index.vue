<script setup lang="ts">
import { cn } from '@/lib/utils.ts'
import { HTMLAttributes } from 'vue'

const props = defineProps<{
	topClass?: HTMLAttributes['class']
}>()
</script>

<template>
	<header>
		<div
			:class="[cn('py-3.5 flex items-center justify-between', props.topClass)]"
		>
			<slot name="top">
				<i class="icon-chat text-white text-[19px]" />
				<div class="top-container-title">
					<i class="icon-wallet text-white/50" />
					<h3>Общий баланс</h3>
				</div>
				<img src="@/assets/icons/gift.svg" alt="gift" />
			</slot>
		</div>
		<slot />
	</header>
</template>
<style lang="postcss" scoped>
header {
	@apply w-full pb-6 container bg-[url("@/assets/images/home-bg-2.png")] bg-cover bg-center bg-no-repeat rounded-b-[16px];
}

.top-container-title {
	@apply flex items-center gap-2;

	h3 {
		@apply leading-5 text-[14px] text-white/50 font-semibold;
	}
}
</style>
