import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from '@/middleware'

const routes = [
	{
		path: '/',
		name: 'index',
		component: () => import('@/pages/index.vue')
	},
	{
		path: '/auth/login',
		name: 'Number',
		component: () => import('@/pages/auth/index.vue')
	},
	{
		path: '/auth/pin',
		name: 'Pin',
		component: () => import('@/pages/auth/Pin.vue')
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/pages/home/index.vue')
	},
	{
		path: '/goal-add',
		name: 'Goal',
		component: () => import('@/pages/goal/add/index.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach(loadLayoutMiddleware)

export default router
