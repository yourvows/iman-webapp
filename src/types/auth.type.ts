export interface IConfirmOtpResponse {
	access_token: string
	investor_id: string
	refresh_token: string
}
export interface IRefreshTokenResponse {
	access_token: string
	refresh_token: string
}
export interface ISendOtpResponse {
	login_exists: boolean
	otp_guid: string
}
export interface IUpdateResponse {
	investor_id: string
}
