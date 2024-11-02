// import { logout } from '@/auth/jwtService'
import axios from 'axios'

import { getCookie, setCookie } from '@/utils/cookie.ts'

const enum StatusCode {
	OK = 200,
	Unauthorized = 401,
	NotFound = 404,
	BadRequest = 400,
	UnprocessableEntity = 422,
	InternalServerError = 500
}

let isAlreadyFetchingAccessToken = false
let subscribers = []

const axiosIns = axios.create({
	baseURL: '/api',
	timeout: 20000
})

//send token
axiosIns.interceptors.request.use(
	config => {
		const token = getCookie('accessToken')
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

//404 or 401 pages use this response
axiosIns.interceptors.response.use(
	response => response,
	er => {
		const { config, response: error } = err
		const originalRequest = config

		if (
			error &&
			error.status === StatusCode.Unauthorized &&
			window.location.pathname !== '/login'
		) {
			if (!isAlreadyFetchingAccessToken) {
				isAlreadyFetchingAccessToken = true
				refreshToken().then(res => {
					isAlreadyFetchingAccessToken = false

					// Update accessToken in localStorage
					setCookie('refreshToken', res.data.refresh, 7)

					onAccessTokenFetched(res.data.access)
				})
			} else if (
				isAlreadyFetchingAccessToken &&
				config.url === '/auth/refresh'
			) {
				// logout()
				console.log('logout')
			} else if (!JSON.parse(localStorage.getItem('userData') || '{}')) {
				window.location.pathname = '/login'
			}
			const retryOriginalRequest = new Promise(resolve => {
				addSubscriber(accessToken => {
					originalRequest.headers.Authorization = `Bearer ${accessToken}`
					resolve(axiosIns(originalRequest))
				})
			})
			return retryOriginalRequest
		} else if (error.status === StatusCode.UnprocessableEntity) {
			if (error && error.data && error.data.message) {
				console.log(error.data.message)
			}
		} else if (error.status === StatusCode.BadRequest) {
			if (error && error.data && error.data.message) {
				console.log(error.data.message)
			}
		} else if (error.status === StatusCode.InternalServerError) {
		}
		return Promise.reject(error)
	}
)

function refreshToken() {
	return axiosIns.post('auth/refresh', {
		refresh_token: getCookie('refreshToken')
	})
}

function onAccessTokenFetched(accessToken: string) {
	subscribers = subscribers.filter(callback => callback(accessToken))
}
function addSubscriber(callback) {
	subscribers.push(callback)
}

export default axiosIns
