import { defineStore } from 'pinia'
import http from '@/utils/http'
import { IInvestment } from '@/types/investment.type.ts'

export const useInvestmentsStore = defineStore('investments', {
	state: () => ({
		investments: [] as IInvestment[]
	}),
	getters: {},
	actions: {
		getInvestments(): Promise<IInvestment[]> {
			return new Promise((resolve, reject) => {
				http
					.get('/v1/investments')
					.then(({ data }) => {
						this.investments = data
						resolve(data)
					})
					.catch(err => reject(err))
			})
		},
		createInvestment(
			params: Partial<{
				amount: number
				goal_icon_id: string
				goal_title: string
				initial_amount: number
				investor_status: string
				is_resident: boolean
				referal_id: string
				strategy_id: string
				tariff_id: string
				term: number
			}>
		) {
			return new Promise((resolve, reject) => {
				http
					.post<{ guid: string }>('/v1/investments', params)
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => reject(err))
			})
		}
	}
})
