import { defineStore } from 'pinia'
import http from '@/utils/http'
import {
	IConfirmOtpResponse,
	IRefreshTokenResponse,
	ISendOtpResponse,
	IUpdateResponse
} from '@/types/auth.ts'

type AuthType = AuthTypes.Phone | AuthTypes.Email

export const useAuthStore = defineStore('auth', {
	state: () => ({
		accessToken: localStorage.getItem('accessToken') || '',
		refreshToken: localStorage.getItem('refreshToken') || '',
		userData: localStorage.getItem('userData') || ''
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
					.post('/investor/send-otp', params)
					.then(res => {
						resolve(res)
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
					.post('/investor/confirm-otp', params)
					.then(res => {
						resolve(res)
					})
					.catch(err => reject(err))
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
