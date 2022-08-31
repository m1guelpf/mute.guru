const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				twitter: '#1DA1F2',
				gray: colors.neutral,
			},
			fontFamily: {
				sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
}
