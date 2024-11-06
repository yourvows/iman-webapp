import { defineStore } from 'pinia'
import http from '@/utils/http'
import {
	IConfirmOtpResponse,
	IRefreshTokenResponse,
	ISendOtpResponse,
	IUpdateResponse
} from '@/types/auth.ts'
import { Token, AuthTypes, StatusCode } from '@/types/enums.ts'
import { useWebAppCloudStorage } from 'vue-tg'

type AuthType = AuthTypes.Phone | AuthTypes.Email
const { setStorageItem } = useWebAppCloudStorage()

export const useAuthStore = defineStore('auth', {
	state: () => ({
		otpInfo: {
			otp_guid: '',
			login_exists: false,
			otp_invalid: false
		},
		phoneNumber: ''
	}),
	getters: {},
	actions: {
		sendOtp(params: {
			auth_type: AuthType
			phone_number?: string
			email?: string
		}): Promise<ISendOtpResponse> {
			return new Promise((resolve, reject) => {
				http
					.post<ISendOtpResponse>('/investor/send-otp', params, {
						headers: {
							'Otp-Secret':
								'SU1BTl9JTlZFU1Q6OGRhYTY3ZGMtYjdlZi00NjAwLThmOWMtNzRhODAxZTQ5NDcy'
						}
					})
					.then(({ data }) => {
						this.otpInfo.otp_guid = data.otp_guid
						this.otpInfo.login_exists = data.login_exists
						resolve(data)
					})
					.catch(err => reject(err))
			})
		},
		confirmOtp(params: {
			code: string
			otp_guid: string
		}): Promise<IConfirmOtpResponse> {
			return new Promise((resolve, reject) => {
				http
					.post<IConfirmOtpResponse>('/investor/confirm-otp', params)
					.then(({ data }) => {
						setStorageItem(Token.AccessToken, data.access_token)
						setStorageItem(Token.RefreshToken, data.refresh_token)
						resolve(data)
					})
					.catch(err => {
						if (err.status === StatusCode.BadRequest) {
							this.otpInfo.otp_invalid = true
						}
						reject(err)
					})
			})
		},
		refreshToken(params: {
			refresh_token: string
		}): Promise<IRefreshTokenResponse> {
			return new Promise((resolve, reject) => {
				http
					.post('/investor/refresh-token', params)
					.then(res => {
						resolve(res)
					})
					.catch(err => reject(err))
			})
		},
		updateEmail(params: {
			code: string
			otp_guid: string
		}): Promise<IUpdateResponse> {
			return new Promise((resolve, reject) => {
				http
					.put('/investor/update/email', params)
					.then(res => {
						resolve(res)
					})
					.catch(err => reject(err))
			})
		},
		updatePhone(params: {
			code: string
			otp_guid: string
		}): Promise<IUpdateResponse> {
			return new Promise((resolve, reject) => {
				http
					.put('/investor/update/phone-number', params)
					.then(res => {
						resolve(res)
					})
					.catch(err => reject(err))
			})
		}
	}
})
