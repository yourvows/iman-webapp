import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { loadLayoutMiddleware } from '@/middleware'
import { goalRoutes } from '@/router/goal'

const routes: Readonly<RouteRecordRaw[]> = [
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
	...goalRoutes
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach(loadLayoutMiddleware)

export default router
