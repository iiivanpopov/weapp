import { on } from '../lib/utils.js'
import { combobox } from './elements.js'
import { SORTED_CITIES } from '../lib/constants.js'

let debounce
let ignoreBlur

const LOWERED = SORTED_CITIES.map(s => s.toLowerCase())

const renderOptions = options => {
	combobox.cityList.innerHTML = options
		.map(city => {
			return `
			<div class="combobox__option" data-city="${city}">
				${city}
			</div>
		`
		})
		.join('')
}

const filterOptions = term => {
	const t = term.toLowerCase()
	return SORTED_CITIES.filter((_, i) => LOWERED[i].includes(t))
}

const showOptions = () => {
	combobox.cityList.style.display = 'block'
	combobox.cityInput.classList.add('combobox--opened')
}

const hideOptions = () => {
	combobox.cityList.style.display = 'none'
	combobox.cityInput.classList.remove('combobox--opened')
}

export const setupCombobox = selectCallback => {
	on(combobox.cityInput, 'focus', () => {
		if (!combobox.cityInput.value) renderOptions(SORTED_CITIES)
		showOptions()
	})

	on(combobox.cityInput, 'blur', () => {
		if (!ignoreBlur) hideOptions()
	})

	on(combobox.cityInput, 'input', e => {
		clearTimeout(debounce)
		debounce = setTimeout(() => {
			const filtered = filterOptions(e.target.value)
			if (filtered.length) return renderOptions(filtered)

			combobox.cityList.innerHTML = 'Nothing found'
		}, 400)
	})

	on(combobox.cityList, 'mouseover', e => {
		const target = e.target.closest('.combobox__option')
		ignoreBlur = !!target
	})

	on(combobox.cityList, 'click', async e => {
		const target = e.target.closest('.combobox__option')
		combobox.cityInput.value = target.dataset.city
		combobox.cityInput.focus()
		hideOptions()
		if (selectCallback) await selectCallback()
	})
}
