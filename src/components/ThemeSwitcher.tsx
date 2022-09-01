import { useCallback } from 'react'
import SunIcon from './Icons/SunIcon'
import MoonIcon from './Icons/MoonIcon'
import { classNames } from '@/lib/utils'
import { useTheme as _useTheme } from 'next-themes'

export const useTheme = () => {
	const { resolvedTheme, setTheme, ...args } = _useTheme()

	const toggleTheme = useCallback(() => {
		setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
	}, [resolvedTheme, setTheme])

	return { resolvedTheme, setTheme, toggleTheme, ...args }
}

const ThemeSwitcher = ({ className = '' }) => {
	const { resolvedTheme, toggleTheme } = useTheme()

	return (
		<button
			onClick={toggleTheme}
			className={classNames(
				className,
				'flex items-center justify-center space-x-2 bg-black/10 dark:bg-white/10 backdrop-filter backdrop-blur-lg backdrop-saturate-150 text-white/70 rounded-full px-3 py-2'
			)}
		>
			{resolvedTheme == 'light' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
			<span className="text-sm capitalize">{resolvedTheme}</span>
		</button>
	)
}

export default ThemeSwitcher
