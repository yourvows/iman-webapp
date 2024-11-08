<script setup lang="ts">
import { Icon } from '@/components/Base'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerTrigger
} from '@/components/ui/drawer'
</script>

<template>
	<Drawer>
		<DrawerTrigger as="button">
			<i class="icon-info text-[18px] text-neutral/50" />
		</DrawerTrigger>
		<DrawerContent>
			<DrawerDescription>
				<div class="container">
					<div class="flex gap-[8px]">
						<Icon icon="uzs" size="32px" />
						<Icon icon="usd" size="32px" />
					</div>

					<div class="border-b py-4">
						<h3 class="font-semibold leading-[21px] mb-2">
							Чем отличаются тарифы?
						</h3>
						<p class="text-[15px] text-neutral font-medium leading-[20px]">
							Вы можете открыть вклад в узбекских сумах со ставкой до ~27% в год
							или в долларах США со ставкой ~13%
						</p>
					</div>
					<div class="py-4">
						<h3 class="font-semibold leading-[21px] mb-2">
							Что значит «Партнёрство 99%»?
						</h3>
						<p class="text-[15px] text-neutral font-medium leading-[20px]">
							99% прибыли с оборота идёт вам, <br />а 1% получаем мы
						</p>
					</div>
				</div>
			</DrawerDescription>
		</DrawerContent>
	</Drawer>
</template>
