import { currentElements, theme } from './elements.js'
import { formatCloudiness, on } from '../lib/utils.js'
import { $api } from '../lib/api.js'
import { setupCombobox } from './combobox.js'
import { loadTheme, toggleTheme } from '../lib/theme.js'

const mapWeatherResponse = response => {
	const {
		location: { name, country, localtime },
		current: { temp_c, humidity, wind_dir, wind_kph, cloud }
	} = response

	return {
		city: name,
		country,

		time: localtime,
		temp: `${temp_c}°C`,
		humidity: `${humidity}%`,
		'wind dir': wind_dir,
		'wind speed': `${wind_kph}km/h`,
		clouds: formatCloudiness(cloud)
	}
}

const displayWeather = weather => {
	currentElements.response.innerHTML = Object.entries(weather)
		.map(([key, value]) => {
			return `
				<div class="field">
					<span class="label field__label">${key.toTitleCase()}</span>	
					<span class="field__value">${value}</span>	
				</div>
			`
		})
		.join('')
}

const setError = error => {
	currentElements.cityForm.error.innerHTML = error
}

const clearCurrent = () => {
	currentElements.response.innerHTML = ''
}

const resetFields = () => {
	setError('')
	currentElements.combobox.cityInput.value = ''
}

const handleFetchCurrent = async () => {
	const city = currentElements.combobox.cityInput.value

	if (!city) return setError('Please select city')

	try {
		const response = await $api.current(city)

		const weather = mapWeatherResponse(response)

		resetFields()
		displayWeather(weather)
	} catch (error) {
		clearCurrent()
		console.log(error)
		setError(error)
	}
}

const initCurrentEvents = () => {
	setupCombobox(handleFetchCurrent)
	on(theme, 'click', toggleTheme)
	on(document, 'DOMContentLoaded', () => {
		loadTheme()
	})
	on(currentElements.cityForm.fetch, 'click', handleFetchCurrent)
}

initCurrentEvents()
