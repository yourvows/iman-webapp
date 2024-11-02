import { RouteLocation } from 'vue-router'

export async function loadLayoutMiddleware(route: RouteLocation) {
	try {
		const layout = route.meta.layout || 'Default'
		const layoutComponent = await import(`@/layouts/${layout}.vue`)
		route.meta.layoutComponent = layoutComponent.default
	} catch (e) {
		console.error('Error occurred in processing of layouts: ', e)
		console.log('Mounted default layout AppLayoutDefault')
		const layout = 'Default'
		const layoutComponent = await import(`@/layouts/${layout}.vue`)
		route.meta.layoutComponent = layoutComponent.default
	}
}
