<script setup lang="ts">
import { Icon } from '@/components/Base'
</script>

<template>
	<div class="wrapper">
		<div class="top">
			<div class="topHeader">
				<Icon icon="chat" />
				<div class="contentHeader">
					<Icon icon="wallet" />
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
			<div class="bottom">
				<span class="rocket">🚀</span>
				<div class="bottomTexts">
					<h3>Поставьте цель и получайте до 27% прибыли</h3>
					<p>Поставьте цель и зарабатывайте, получайте до 27% прибыли</p>
				</div>
				<div class="buttonClose">
					<Icon icon="x" />
				</div>
			</div>
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
				<RouterLink to="/intention/add">
					<button class="bottomButton">Добавить</button>
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

.contentProfitIcon {
	@apply flex items-center gap-1;
}

.contentProfitTitle {
	@apply font-medium leading-[20px] text-[14px] text-left text-white;
}

.contentProfitLine {
	@apply w-[1px] h-3.5 bg-white/20;
}

.contentText {
	@apply mt-2.5 leading-4 text-[14px] font-medium text-center text-white;
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

.buttonClose {
	@apply size-[12px];

	img {
		@apply w-full h-full object-contain;
	}
}

.goal {
	@apply bg-[#f5f7fa] min-h-[499px] pb-[80px];
}

.goalEmpty {
	@apply pt-[64px] pb-[80px] flex flex-col items-center justify-center gap-[16px];
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

.goalHeader {
	@apply px-[14px] pb-[14px];
}

.headerList {
	display: flex;
	align-items: center;
	@include resa('gap', 10px);
	overflow-x: scroll;
	@include resa('padding-top', 2px);
	@include resa('padding-bottom', 2px);
	@include resa('padding-right', 16px);
	@include resa('padding-left', 2px);
	&::-webkit-scrollbar {
		display: none;
	}
}

.headerListItem {
	outline-color: #6f49fe;
	outline-style: solid;
	@include resa('outline-width', 1px);
	@include resa('border-radius', 20px);
	@include resa('padding', 3px);
	@include resa('min-width', 100px);
	@include resa('height', 100px);
}

.headerListItemInner {
	width: 100%;
	height: 100%;
	@include resa('border-radius', 18px);
	position: relative;
	background: linear-gradient(0deg, #6f49fe, #6f49fe),
		linear-gradient(0deg, #8183f8, #8183f8),
		linear-gradient(0deg, #3680ff, #3680ff);
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
		@include resa('border-radius', 18px);
	}
	h3 {
		font-weight: 600;
		@include resa('line-height', 14px);
		@include resa('font-size', 12px);
		text-align: left;
		color: #ffffff;
		position: absolute;
		@include resa('bottom', 10px);
		@include resa('left', 10px);
		z-index: 2;
		@include resa('max-width', 74px);
	}
}

.body {
	@apply flex-[1] flex items-center justify-center;
}

.bottomButton {
	@apply rounded-[10px] bg-[#3680ff] text-center w-full py-3 px-[20px] font-semibold leading-[18px] text-[14px] text-white;

	&.other {
		@apply bg-[#3680ff14] text-[#3680ff];
	}
}
</style>
