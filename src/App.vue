<template>
	<component :is="route.meta.layoutComponent">
		<slot class="container" />
	</component>
</template>

<style lang="postcss">
body {
	@apply bg-white text-black;
}
</style>
