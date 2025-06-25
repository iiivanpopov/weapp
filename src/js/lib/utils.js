export const $ = selector => document.querySelector(selector)
export const on = (el, event, handler) => el.addEventListener(event, handler)

export const formatCloudiness = percent => {
	if (percent < 10) return 'Clear'
	if (percent < 30) return 'Mostly Clear'
	if (percent < 70) return 'Partly Cloudy'
	if (percent < 88) return 'Mostly Cloudy'
	return 'Overcast'
}

String.prototype.toTitleCase = function () {
	return this.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}
