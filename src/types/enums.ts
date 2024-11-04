export enum AuthTypes {
	Phone = 1,
	Email = 2
}

export enum Token {
	AccessToken = 'accessToken',
	RefreshToken = 'refreshToken'
}

export enum StatusCode {
	OK = 200,
	Unauthorized = 401,
	NotFound = 404,
	BadRequest = 400,
	UnprocessableEntity = 422,
	InternalServerError = 500
}
