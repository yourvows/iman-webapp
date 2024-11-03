import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from '@/middleware'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/pages/index.vue')
	},
	{
		path: '/auth/login',
		name: 'Number',
		component: () => import('@/pages/auth/index.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach(loadLayoutMiddleware)

export default router
