import { Currency } from '@/types/strategies.type.ts'

export interface IInvestment {
	guid: string
	position: number
	investment_amount: number
	last_month_profit: {
		amount: number
		start_balance: number
		month: string
	}
	bonuses: []
	strategy_id: string
	tarif_id: string
	goal: {
		guid: string
		title: string
		icon: string
		amount: number
		term: number
		initial_amount: number
		days_left: number
	}
	inv_tr_end_amount: number
	div_tr_end_amount: number
	ttl_success_payments: number
	group_id: string
	investment_status: string
	currency: Currency.UZS | Currency.USD
	investment_tariff: {
		guid: string
		strategy_id: string
		name_eng: string
		name_uz: string
		name_ru: string
		start_value: number
		max_value: number
		term: number
		irr_value: number
		forecast: string
		date_from: string
		date_to: string
		show: boolean
		group_name: string
		fine: number
		currency: Currency.UZS | Currency.USD
		created_at: string
		updated_at: string
	}
}
