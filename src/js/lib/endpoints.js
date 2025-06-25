import { config } from './config.js'

const MODULE = {
	CURRENT: 'current',
	FORECAST: 'forecast'
}

class ApiEndpoints {
	_apiUrl
	_apiKey

	constructor(apiUrl = config.API_URL, apiKey = config.API_KEY) {
		this._apiUrl = apiUrl
		this._apiKey = apiKey
	}

	_generatePath(module) {
		return `${this._apiUrl}/${module}.json?key=${this._apiKey}`
	}

	current(city) {
		const basePath = this._generatePath(MODULE.CURRENT)
		return `${basePath}&q=${encodeURIComponent(city)}`
	}

	forecast(city, days) {
		const basePath = this._generatePath(MODULE.FORECAST)
		return `${basePath}&q=${encodeURIComponent(city)}&days=${days}`
	}
}

export const endpoints = new ApiEndpoints()
