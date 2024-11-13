import { defineAsyncComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const GoalSingle = defineAsyncComponent(
	() => import('@/pages/goal/single/index.vue')
)

export const goalRoutes: Readonly<RouteRecordRaw[]> = [
	{
		path: '/goal/:id',
		name: 'GoalSingle',
		component: GoalSingle,
		props: true
	},
	{
		path: '/goal-add',
		name: 'Goal',
		component: () => import('@/pages/goal/add/index.vue')
	},
	{
		path: '/goal-select-plan',
		name: 'GoalSelectPlan',
		component: () => import('@/pages/goal/select-plan/index.vue')
	},
	{
		path: '/goal-created',
		name: 'GoalCreated',
		component: () => import('@/pages/goal/created/index.vue')
	}
]
