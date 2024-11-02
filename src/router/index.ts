import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from '@/middleware'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/pages/index.vue')
	},
	{
		path: '/registration/pin',
		name: 'Pin',
		component: () => import('@/pages/registration/Pin.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach(loadLayoutMiddleware)

export default router
