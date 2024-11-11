import { defineAsyncComponent } from 'vue'

const GoalAdd = defineAsyncComponent(() => import('@/pages/goal/add/index.vue'))
const GoalSelectPlan = defineAsyncComponent(
	() => import('@/pages/goal/select-plan/index.vue')
)
const GoalCreated = defineAsyncComponent(
	() => import('@/pages/goal/created/index.vue')
)

export const goalRoutes = [
	{
		path: '/goal-add',
		name: 'Goal',
		component: GoalAdd
	},
	{
		path: '/goal-select-plan',
		name: 'GoalSelectPlan',
		component: GoalSelectPlan
	},
	{
		path: '/goal-created',
		name: 'GoalCreated',
		component: GoalCreated
	}
]
