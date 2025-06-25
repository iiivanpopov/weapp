import { setupCombobox } from './combobox.js'
import { $, formatCloudiness, on } from '../lib/utils.js'
import {
	cityForm,
	combobox,
	forecastElements,
	modal,
	theme
} from './elements.js'
import { $api } from '../lib/api.js'
import { loadTheme, toggleTheme } from '../lib/theme.js'

const mapForecastResponse = response => {
	const {
		forecast: { forecastday },
		location: { name, country }
	} = response

	const days = forecastday.map(day => {
		const { date } = day
		const hours = day.hour.map(hour => {
			const { temp_c, feelslike_c, wind_kph, cloud, humidity, wind_dir } = hour
			return {
				temp: `${temp_c}°C`,
				feels: `${feelslike_c}°C`,
				'wind speed': `${wind_kph}km/h`,
				'wind dir': wind_dir,
				cloud: formatCloudiness(cloud),
				humidity: `${humidity}%`
			}
		})
		return { date, hours }
	})

	return { country, city: name, days }
}

const renderModal = (id, hour) => {
	return `
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
}

const displayForecast = forecast => {
	let modals = ''
	forecastElements.response.innerHTML = `
		<span class="forecast__place">${forecast.country} ${forecast.city}</span>
		${forecast.days
			.map(
				day => `
					<span class="forecast__date">${day.date}</span>
					<div class="hours__grid">
						${day.hours
							.map((hour, i) => {
								const delay = (i * 0.05).toFixed(2)
								const currentHour = `${i.toString().padStart(2, '0')}:00`
								modals += renderModal(i, hour)
								return `
									<div class="grid__hour" id="hour-${i}" style="animation-delay: ${delay}s;">
										<span class="hour__time">${currentHour}</span>
										<span class="forecast__temperature">${hour.temp}</span>
									</div>
								`
							})
							.join('')}
					</div>
				`
			)
			.join('')}
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

const setError = error => {
	cityForm.error.innerHTML = error
}

const resetFields = () => {
	setError('')
}

const clearCurrent = () => {
	forecastElements.response.innerHTML = ''
}

const handleFetchForecast = async () => {
	const city = combobox.cityInput.value
	const days = forecastElements.days.value

	if (!city || !days) return setError('Please select city and day')

	try {
		const response = await $api.forecast(city, days)
		const forecast = mapForecastResponse(response)
		resetFields()
		displayForecast(forecast)
	} catch (error) {
		clearCurrent()
		console.log(error)
		setError(error)
	}
}

const initForecastEvents = () => {
	setupCombobox(handleFetchForecast)
	on(cityForm.fetch, 'click', handleFetchForecast)
	on(forecastElements.days, 'input', handleFetchForecast)
	on(theme, 'click', toggleTheme)
	on(document, 'DOMContentLoaded', () => {
		loadTheme()
	})
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
