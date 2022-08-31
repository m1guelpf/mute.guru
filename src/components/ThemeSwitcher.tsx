import { useCallback } from 'react'
import { classNames } from '@/lib/utils'
import { useTheme as _useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

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
				'flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-full px-3 py-2'
			)}
		>
			{resolvedTheme == 'light' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
			<span className="text-sm capitalize">{resolvedTheme}</span>
		</button>
	)
}

export default ThemeSwitcher
