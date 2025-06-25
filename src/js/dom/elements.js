import { $ } from '../lib/utils.js'

export const combobox = {
	cityInput: $('#city-input'),
	cityList: $('#city-list')
}

export const cityForm = {
	fetch: $('.city-form__submit'),
	error: $('.city-form__error')
}

export const modal = id => $(`#modal-${id.split('-')[1]}`)

export const theme = $('.theme')

export const currentElements = {
	combobox,
	cityForm,
	response: $('.current-weather')
}

export const forecastElements = {
	combobox,
	cityForm,
	days: $('#days-input'),
	response: $('.forecast')
}
