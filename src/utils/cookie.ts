export function setCookie(name: string, value: string, expirationDays: number) {
	const date = new Date()

	const millisecondsInADay = 24 * 60 * 60 * 1000
	date.setTime(date.getTime() + expirationDays * millisecondsInADay)

	const expires = 'expires=' + date.toUTCString()

	document.cookie = name + '=' + value + ';' + expires + ';path=/'
}

export function getCookie(name: string): string {
	const cookies = document.cookie.split('; ')
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split('=')
		if (cookie[0] === name) {
			return cookie[1]
		}
	}

	return ''
}
