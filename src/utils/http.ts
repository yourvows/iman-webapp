// import { logout } from '@/auth/jwtService'
import axios from 'axios'
import { useWebAppCloudStorage } from 'vue-tg'
import { Token, StatusCode } from '@/types/enums.ts'

let isAlreadyFetchingAccessToken = false

let subscribers: ((accessToken: string) => void)[] = []

const { setStorageItem, getStorageItem } = useWebAppCloudStorage()

const axiosIns = axios.create({
	baseURL: '/api',
	timeout: 20000
})

//send token
axiosIns.interceptors.request.use(
	async config => {
		const token = await getStorageItem(Token.AccessToken)
		//todo: change to user language
		config.headers['Accept-Language'] = 'ru'
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
	err => {
		const { config, response } = err
		const originalRequest = config
		if (
			response &&
			response.status === StatusCode.Unauthorized &&
			window.location.pathname !== '/auth/login'
		) {
			if (!isAlreadyFetchingAccessToken) {
				isAlreadyFetchingAccessToken = true
				refreshToken().then(async res => {
					console.log(res)
					isAlreadyFetchingAccessToken = false

					// Update accessToken in localStorage
					await setStorageItem(Token.AccessToken, res.data.access_token)
					await setStorageItem(Token.RefreshToken, res.data.refresh_token)

					onAccessTokenFetched(res.data.access)
				})
			} else if (
				isAlreadyFetchingAccessToken &&
				config.url === 'investor/refresh-token'
			) {
				// logout()
				console.log('logout')
			}
			const retryOriginalRequest = new Promise(resolve => {
				addSubscriber((accessToken: string) => {
					originalRequest.headers.Authorization = `Bearer ${accessToken}`
					resolve(axiosIns(originalRequest))
				})
			})
			return retryOriginalRequest
		} else if (response.status === StatusCode.UnprocessableEntity) {
			if (response && response.data && response.data.message) {
				console.log(response.data.message)
			}
		} else if (response.status === StatusCode.BadRequest) {
			if (response && response.data && response.data.message) {
				console.log(response.data.message)
			}
		} else if (response.status === StatusCode.InternalServerError) {
		}
		return Promise.reject(response)
	}
)

async function refreshToken() {
	return axiosIns.post('investor/refresh-token', {
		refresh_token: await getStorageItem(Token.RefreshToken)
	})
}

function onAccessTokenFetched(accessToken: string) {
	subscribers = subscribers.filter(callback => callback(accessToken))
}
function addSubscriber(callback: (accessToken: string) => void) {
	subscribers.push(callback)
}

export default axiosIns
