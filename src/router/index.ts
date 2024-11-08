import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from '@/middleware'
import { defineAsyncComponent } from 'vue'

const Index = defineAsyncComponent(() => import('@/pages/index.vue'))
const AuthLogin = defineAsyncComponent(() => import('@/pages/auth/index.vue'))
const AuthPin = defineAsyncComponent(() => import('@/pages/auth/Pin.vue'))
const Home = defineAsyncComponent(() => import('@/pages/home/index.vue'))
const GoalAdd = defineAsyncComponent(() => import('@/pages/goal/add/index.vue'))
const GoalSelectPlan = defineAsyncComponent(
	() => import('@/pages/goal/select-plan/index.vue')
)

const routes = [
	{
		path: '/',
		name: 'index',
		component: () => Index
	},
	{
		path: '/auth/login',
		name: 'Number',
		component: AuthLogin
	},
	{
		path: '/auth/pin',
		name: 'Pin',
		component: () => AuthPin
	},
	{
		path: '/home',
		name: 'Home',
		component: () => Home
	},
	{
		path: '/goal-add',
		name: 'Goal',
		component: () => GoalAdd
	},
	{
		path: '/goal-select-plan',
		name: 'GoalSelectPlan',
		component: () => GoalSelectPlan
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach(loadLayoutMiddleware)

export default router
