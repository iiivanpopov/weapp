export const $ = selector => document.querySelector(selector)
export const on = (el, event, handler) => el.addEventListener(event, handler)

export const formatCloudiness = percent => {
	if (percent < 10) return 'Clear'
	if (percent < 30) return 'Mostly Clear'
	if (percent < 70) return 'Partly Cloudy'
	if (percent < 88) return 'Mostly Cloudy'
	return 'Overcast'
}

export const getTempGradientVar = temp => {
	if (temp <= -30) return 'var(--temp-gradient--30)'
	if (temp <= -20) return 'var(--temp-gradient--20)'
	if (temp <= -10) return 'var(--temp-gradient--10)'
	if (temp <= 0) return 'var(--temp-gradient-0)'
	if (temp <= 10) return 'var(--temp-gradient-10)'
	if (temp <= 20) return 'var(--temp-gradient-20)'
	if (temp <= 30) return 'var(--temp-gradient-30)'
	if (temp <= 40) return 'var(--temp-gradient-40)'
	return 'var(--temp-gradient-50)'
}

String.prototype.toTitleCase = function () {
	return this.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}
