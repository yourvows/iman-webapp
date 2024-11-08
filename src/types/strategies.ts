export interface ITariff {
	guid: string
	title_eng: string
	title_uz: string
	title_ru: string
	type_id: number
	start_value: number
	max_value: number
	forecast: string
	terms: number
	show: boolean
	group: string
	fine: number
	currency: Currency.UZS | Currency.USD
}

export enum Currency {
	UZS = 'uzs',
	USD = 'usd'
}
