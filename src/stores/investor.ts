import { defineStore } from 'pinia'
import http from '@/utils/http.ts'
import {
	IInvestorAddCardResponse,
	IInvestorCard
} from '@/types/investor.types.ts'

export const useInvestorStore = defineStore({
	id: 'investor',
	state: () => ({
		cards: [] as IInvestorCard[]
	}),
	getters: {},
	actions: {
		addCard(params: {
			card_holder_name: string
			card_number: string
			card_type: string
			cvv: string
			expire: string
		}): Promise<IInvestorAddCardResponse> {
			return new Promise((resolve, reject) => {
				http
					.post<IInvestorAddCardResponse>('/v1/investor/cards', { params })
					.then(({ data }) => {
						resolve(data)
					})
					.catch(err => reject(err))
			})
		},
		getCards() {
			return new Promise((resolve, reject) => {
				http
					.get<IInvestorCard[]>('/v1/investor/cards')
					.then(({ data }) => {
						this.cards = data
						resolve(data)
					})
					.catch(err => reject(err))
			})
		}
	}
})
