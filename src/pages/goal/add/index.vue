<script setup lang="ts">
import { BackButton, MainButton } from 'vue-tg'
import { goalAbout } from '@/data/data.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
	<div class="wrapper">
		<div class="top">
			<img src="@/assets/images/coins.webp" alt="coins" />
		</div>
		<div class="body container">
			<div class="title">О вкладе</div>
			<div class="contentWrapperBox contentWrapperHistory">
				<ul class="featuresList">
					<li
						v-for="(about, index) in goalAbout"
						:key="index"
						class="featuresListItem"
					>
						<div class="featuresListItemIcon">
							<i :class="`icon-${about.icon}`" class="text-blue" />
						</div>
						<div class="featuresListItemTexts">
							<h3>{{ about.title }}</h3>
							<p>{{ about.description }}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<BackButton @click="() => router.push('/home')" />
		<MainButton
			@click="() => router.push('/goal-select-plan')"
			text="Продолжить"
		/>
	</div>
</template>

<style scoped lang="postcss">
.wrapper {
	@apply flex items-start justify-start flex-col w-full h-screen overflow-hidden overflow-y-scroll;
}
.body {
	@apply flex flex-col mt-6 gap-7;
}
.top {
	@apply w-full h-1/3 bg-[url('@/assets/images/home-bg-2.png')] bg-no-repeat bg-cover bg-center;

	& img {
		@apply w-full h-full object-cover;
	}
}
.title {
	@apply font-semibold text-[20px] leading-[25px];
}

.featuresListItemIcon {
	@apply flex items-center justify-center size-[42px] rounded-full bg-[#f5f7fa];
}
.featuresListItemTexts {
	@apply flex flex-col gap-1;

	h3 {
		@apply font-semibold text-left leading-[20px];
	}
	p {
		@apply font-medium text-left text-[13px] leading-[18px] text-[#9aa3b3] max-w-[283px];
	}
}
.featuresListItem {
	@apply flex items-center gap-3;
}

.featuresList {
	@apply flex flex-col gap-5;
}
</style>
