import { defineStore } from 'pinia'
import http from '@/utils/http.ts'

export const useSharedStore = defineStore({
	id: 'shared',
	state: () => ({
		usd_rate: 0,
		isFetched: false,
		isUserVerified: false
	}),
	getters: {},
	actions: {
		async getUSDRate() {
			if (this.isFetched) return
			const {
				data: { rate }
			} = await http.get('/v1/investments/get-usd')
			this.isFetched = true
			this.usd_rate = rate
		},
		async checkUserVerification() {
			const {
				data: { status }
			} = await http.get('/v1/investor/status')
			this.isUserVerified = status === 'verified'
		}
	}
})
