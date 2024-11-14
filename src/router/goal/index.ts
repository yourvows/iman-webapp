import { defineAsyncComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const GoalSingle = defineAsyncComponent(
	() => import('@/pages/goal/single/index.vue')
)

const Add = defineAsyncComponent(() => import('@/pages/goal/add/index.vue'))
const Created = defineAsyncComponent(
	() => import('@/pages/goal/created/index.vue')
)
const SelectPlan = defineAsyncComponent(
	() => import('@/pages/goal/select-plan/index.vue')
)

export const goalRoutes: Readonly<RouteRecordRaw[]> = [
	{
		path: '/goal/:id?',
		name: 'GoalSingle',
		component: GoalSingle,
		props: true
	},
	{
		path: '/goal-add',
		name: 'Goal',
		component: Add
	},
	{
		path: '/goal-select-plan',
		name: 'GoalSelectPlan',
		component: SelectPlan
	},
	{
		path: '/goal-created',
		name: 'GoalCreated',
		component: Created
	}
]
