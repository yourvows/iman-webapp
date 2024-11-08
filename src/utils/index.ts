import { Currency, ITariff } from '@/types/strategies.ts'

/**
 * Masks a phone number by replacing the last two parts with asterisks.
 * 90 123 45 67 -> 90 123 ** **
 *
 * @param number - The phone number to be masked.
 * @returns The masked phone number.
 */
export function maskPhoneNumber(number: string) {
	const parts = number.split(' ')

	return `${parts[0]} ${parts[1]} ** **`
}

export function calculateProfitability(params: {
	isCapitalized: boolean
	isDollar: boolean
	tariff: ITariff
	initialAmount: number
}) {
	const { isCapitalized, isDollar, tariff, initialAmount } = params
	let forecast

	if (!isCapitalized) {
		forecast = isDollar ? 7 : Number(tariff?.forecast) - tariff?.terms / 6
	} else {
		forecast = Number(tariff?.forecast)
	}

	const result = ((initialAmount * forecast) / 100) * (tariff?.terms / 12)

	return {
		result,
		forecast
	}
}

export function formatMoney(
	amount: number,
	locale = 'ru-RU',
	currencyLabel = Currency.UZS
) {
	const currency = new Intl.NumberFormat(locale, {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(amount)
	return currencyLabel === Currency.UZS ? `${currency} сум` : `$${currency}`
}
