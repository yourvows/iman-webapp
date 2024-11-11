import http from '@/utils/http.ts'
import { defineStore } from 'pinia'
import { ITariff, Currency, IStrategy } from '@/types/strategies.type.ts'

export const useStrategiesStore = defineStore('strategies', {
	state: () => ({
		tariffs: [] as ITariff[],
		strategies: [] as IStrategy[]
	}),
	getters: {
		GET_ACTIVE_TARIFFS_BY_CURRENCY(state) {
			const groupedTariffs = Object.groupBy(
				state.tariffs,
				({ currency }) => currency
			)

			return Object.keys(groupedTariffs).reduce(
				(result: Record<Currency, ITariff[]>, currency: string) => {
					result[currency as Currency] = (
						groupedTariffs[currency as Currency] ?? []
					).filter((tariff: ITariff) => tariff.show)

					return result
				},
				{} as Record<Currency, ITariff[]>
			)
		},

		GET_ACTIVE_UZS_TARIFFS(): ITariff[] {
			return this.GET_ACTIVE_TARIFFS_BY_CURRENCY[Currency.UZS] || []
		},

		GET_ACTIVE_USD_TARIFFS(): ITariff[] {
			return this.GET_ACTIVE_TARIFFS_BY_CURRENCY[Currency.USD] || []
		}
	},
	actions: {
		getStrategies(): Promise<IStrategy[]> {
			return new Promise((resolve, reject) => {
				http
					.get<IStrategy[]>('/v1/strategies')
					.then(({ data }) => {
						this.strategies = data
						resolve(data)
					})
					.catch(err => reject(err))
			})
		},
		getTariffs(params: { limit: number }): Promise<ITariff[]> {
			return new Promise((resolve, reject) => {
				http
					.get<ITariff[]>('/v1/strategies/tariffs', { params })
					.then(({ data }) => {
						this.tariffs = data
						resolve(data)
					})
					.catch(err => reject(err))
			})
		}
	}
})
