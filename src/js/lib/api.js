import { endpoints } from './endpoints.js'

const ERRORS = {
	CURRENT: 'Fetch current weather',
	FORECAST: 'Fetch forecast'
}

class Api {
	async _send(url, errorMessage) {
		const response = await fetch(url)

		const json = await response.json()

		if (!response.ok) {
			const apiMessage = json?.error?.message
			if (apiMessage === 'No matching location found') {
				throw new Error(apiMessage)
			}
			throw new Error(`${errorMessage}: ${apiMessage ?? JSON.stringify(json)}`)
		}

		return json
	}

	current(city) {
		const url = endpoints.current(city)
		return this._send(url, ERRORS.CURRENT)
	}

	forecast(city, days) {
		const url = endpoints.forecast(city, days)
		return this._send(url, ERRORS.FORECAST)
	}
}

export const $api = new Api()
