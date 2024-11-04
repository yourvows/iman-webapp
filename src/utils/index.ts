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
