import { $api } from '../lib/api.js'
import { loadTheme, toggleTheme } from '../lib/theme.js'
import { $, formatCloudiness, on } from '../lib/utils.js'
import { setupCombobox } from './combobox.js'
import {
	cityForm,
	combobox,
	forecastElements,
	modal,
	theme
} from './elements.js'

const mapForecastResponse = response => {
	const {
		location: { name, country },
		forecast: { forecastday }
	} = response

	const days = forecastday.map(({ date, hour }) => ({
		date,
		hours: hour.map(
			({ temp_c, feelslike_c, wind_kph, cloud, humidity, wind_dir }) => ({
				temp: `${temp_c}°C`,
				feels: `${feelslike_c}°C`,
				'wind speed': `${wind_kph}km/h`,
				'wind dir': wind_dir,
				cloud: formatCloudiness(cloud),
				humidity: `${humidity}%`
			})
		)
	}))

	return { country, city: name, days }
}

const renderModal = (id, hour) => `
	<div class="card modal" id="modal-${id}">
		<button class="button modal__close" data-close>×</button>
		${Object.entries(hour)
			.map(
				([key, value]) => `
					<div class="field">
						<span class="label field__label">${key.toTitleCase()}</span>
						<span class="field__value">${value}</span>
					</div>
				`
			)
			.join('')}
	</div>
`

const displayForecast = forecast => {
	let modals = ''

	const content = forecast.days
		.map(day => {
			const hoursHtml = day.hours
				.map((hour, i) => {
					const delay = (i * 0.05).toFixed(2)
					const time = `${i.toString().padStart(2, '0')}:00`

					modals += renderModal(i, hour)

					return `
						<div class="grid__hour" id="hour-${i}" style="animation-delay: ${delay}s;">
							<span class="hour__time">${time}</span>
							<span class="forecast__temperature">${hour.temp}</span>
						</div>
					`
				})
				.join('')

			return `
				<span class="forecast__date">${day.date}</span>
				<div class="hours__grid">${hoursHtml}</div>
			`
		})
		.join('')

	forecastElements.response.innerHTML = `
		<span class="forecast__place">${forecast.country} ${forecast.city}</span>
		${content}
	`

	$('.modal-backdrop').innerHTML = modals
}

const showModal = id => {
	$('.modal-backdrop').style.display = 'block'
	const modalEl = modal(id)
	if (modalEl) modalEl.classList.add('modal--open')
}

const hideModal = id => {
	$('.modal-backdrop').style.display = 'none'
	const modalEl = modal(id)
	if (modalEl) modalEl.classList.remove('modal--open')
}

const setError = message => {
	cityForm.error.innerHTML = message
}

const resetFields = () => {
	setError('')
}

const clearCurrent = () => {
	forecastElements.response.innerHTML = ''
}

const handleFetchForecast = async () => {
	const city = combobox.cityInput.value.trim()
	const days = forecastElements.days.value

	if (!city || !days) {
		return setError('Please select city and day')
	}

	try {
		const response = await $api.forecast(city, days)
		const forecast = mapForecastResponse(response)

		resetFields()
		displayForecast(forecast)
	} catch (error) {
		clearCurrent()
		console.error(error)
		setError(error.message || 'Failed to fetch forecast')
	}
}

const initForecastEvents = () => {
	setupCombobox(handleFetchForecast)

	on(cityForm.fetch, 'click', handleFetchForecast)
	on(forecastElements.days, 'input', handleFetchForecast)
	on(theme, 'click', toggleTheme)
	on(document, 'DOMContentLoaded', loadTheme)

	on(document.body, 'click', e => {
		const targetHour = e.target.closest('.grid__hour')
		if (targetHour) return showModal(targetHour.id)

		if (e.target.matches('[data-close]')) {
			const modalEl = e.target.closest('.modal')
			if (modalEl) hideModal(modalEl.id.replace('modal-', ''))
		}
	})
}

initForecastEvents()
