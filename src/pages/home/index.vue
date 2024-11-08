<script setup lang="ts">
import { Icon, VButton } from '@/components/Base'
import { onMounted } from 'vue'
import { useTelegram } from '@/composables/useTelegram.ts'

const { MainButton, BackButton } = useTelegram()

onMounted(async () => {
	MainButton.hide()
	BackButton.hide()
})
</script>

<template>
	<div class="wrapper">
		<div class="top">
			<div class="topHeader">
				<i class="icon-chat text-white text-[19px]" />
				<div class="contentHeader">
					<i class="icon-wallet text-white/50" />
					<h3>Общий баланс</h3>
				</div>
				<Icon icon="gift" />
			</div>
			<div class="content">
				<h3 class="contentBalance">0 <span>сум</span></h3>
				<div class="contentProfit">
					<h3 class="contentProfitTitle">
						Нет вложений, чтобы начислять прибыль
					</h3>
				</div>
			</div>
			<!--			<div class="bottom">-->
			<!--				<span class="rocket">🚀</span>-->
			<!--				<div class="bottomTexts">-->
			<!--					<h3>Поставьте цель и получайте до 27% прибыли</h3>-->
			<!--					<p>Поставьте цель и зарабатывайте, получайте до 27% прибыли</p>-->
			<!--				</div>-->
			<!--				<div>-->
			<!--					<i class="icon-x text-[7px] text-center text-neutral" />-->
			<!--				</div>-->
			<!--			</div>-->
		</div>

		<div class="body">
			<div class="goalEmpty">
				<div class="goalEmptyIcon">
					<Icon icon="no-purpose" />
				</div>
				<div class="goalEmptyTexts">
					<h3>У вас пока нет целей</h3>
					<p>
						Вы ничего не зарабатываете, <br />
						потому что не добавлены цели и не выбран тариф заработка
					</p>
				</div>
				<RouterLink to="/goal-add">
					<VButton variant="primary">Добавить вклад</VButton>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<style scoped lang="postcss">
.wrapper {
	@apply h-dvh flex flex-col overflow-y-auto;
}

.top {
	@apply w-full bg-[url("@/assets/images/home-bg-2.png")] bg-cover bg-center bg-no-repeat rounded-b-[16px] p-1 pt-4;
}

.rocket {
	@apply inline-flex justify-center items-center size-[48px] rounded-[50%] bg-[#f4f4f5];
}

.topHeader {
	@apply p-0 px-4 flex items-center justify-between;
}

.content {
	@apply mt-2.5 flex flex-col items-center;
}

.contentHeader {
	@apply flex items-center gap-2;
	svg {
		@apply size-[16px];
	}
	h3 {
		@apply leading-5 text-[14px] text-white/50 font-semibold;
	}
}

.contentBalance {
	@apply mt-1.5 text-[32px] leading-9 font-medium tracking-[-0.01em] text-center text-white;
	span {
		@apply opacity-50;
	}
}

.contentProfit {
	@apply mt-1.5 flex items-center gap-2 px-2.5 py-1 rounded-[20px] bg-[#3e23971f];

	svg {
		@apply size-[16px];
	}
}

.contentProfitTitle {
	@apply font-medium leading-[20px] text-[14px] text-left text-white;
}

.bottom {
	@apply mt-4 min-h-[74px] bg-white rounded-[16px] grid grid-cols-[48px,1fr,12px] gap-3.5 p-3.5 shadow-[0,4px,32px,0,#5b538129];
}

.bottomTexts {
	@apply flex flex-col gap-2;

	& > h3 {
		@apply font-semibold leading-[20px] text-[16px] text-left text-[#040415] tracking-[-0.19px];
	}
	& > p {
		@apply leading-[16px] text-[14px] text-left text-[#040415]/50;
	}
}

.goalEmpty {
	@apply pt-[105px] flex flex-col items-center justify-center gap-[16px];
}

.goalEmptyIcon {
	img {
		@apply w-full h-full object-contain;
	}
}

.goalEmptyTexts {
	@apply flex flex-col gap-[10px];
	& > h3 {
		@apply font-semibold leading-[24px] text-[20px] text-center text-[#040415];
	}
	& > p {
		@apply font-medium leading-[20px] text-[14px] text-center text-[#040415]/50 max-w-[315px];
	}
}

.body {
	@apply flex items-center justify-center;
}
</style>
