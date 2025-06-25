const THEMES = {
	DARK: 'dark',
	LIGHT: 'light'
}

export const getTheme = () => {
	return localStorage.getItem('theme') || THEMES.DARK
}

const saveTheme = theme => {
	localStorage.setItem('theme', theme)
}

export const loadTheme = () => {
	document.body.classList.add(getTheme())
}

export const toggleTheme = () => {
	const currentTheme = getTheme()
	const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
	document.body.classList.toggle(THEMES.LIGHT, newTheme === THEMES.LIGHT)
	saveTheme(newTheme)
}
