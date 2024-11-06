<script setup lang="ts">
import useBaseIcon from './useBaseIcon'

const props = defineProps<{
	icon: string
	size?: string
	color?: string
}>()

const { SVGComponent, isSlot } = useBaseIcon(props)
</script>
<template>
	<i
		class="base-icon"
		:style="{ color: props.color, fontSize: size ?? '24px' }"
	>
		<template v-if="isSlot">
			<slot />
		</template>

		<SVGComponent v-else />
	</i>
</template>
<style scoped>
.base-icon {
	svg {
		font-size: inherit;
	}
}
</style>
