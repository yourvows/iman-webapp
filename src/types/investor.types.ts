export interface IInvestorCard {
	card_type: string
	guid: string
	owner_status: string
	pan: string
	status: string
}

export interface IInvestorAddCardResponse {
	guid: string
	need_otp: boolean
}
