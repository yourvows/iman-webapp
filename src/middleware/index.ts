import {
	NavigationGuardNext,
	RouteLocation,
	RouteLocationNormalized
} from 'vue-router'

export async function loadLayoutMiddleware(
	to: RouteLocation,
	_: RouteLocationNormalized,
	next: NavigationGuardNext
) {
	try {
		const layout = to.meta.layout || 'Default'
		const layoutComponent = await import(`@/layouts/${layout}.vue`)
		to.meta.layoutComponent = layoutComponent.default
	} catch (e) {
		console.error('Error occurred in processing of layouts: ', e)
		console.log('Mounted default layout AppLayoutDefault')
		const layout = 'Default'
		const layoutComponent = await import(`@/layouts/${layout}.vue`)
		to.meta.layoutComponent = layoutComponent.default
	}
	next()
}
