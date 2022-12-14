import Image from 'next/image'
import SunIcon from './Icons/SunIcon'
import { motion } from 'framer-motion'
import MoonIcon from './Icons/MoonIcon'
import { useTheme } from './ThemeSwitcher'
import useSession from '@/hooks/useSession'
import { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren<{}>

const Toolbar: FC<Props> = ({ children }) => {
	const session = useSession()
	const { resolvedTheme, toggleTheme } = useTheme()

	return (
		<footer className="bg-white dark:bg-black border-t dark:border-gray-800 flex items-center justify-between w-full md:max-w-xl md:mx-auto md:px-4 px-3 py-2 fixed bottom-[env(safe-area-inset-bottom)] md:static">
			<div className="flex items-start space-x-2">
				{session.status == 'authenticated' && (
					<button title="Log Out" onClick={session.logOut}>
						<Image
							className="rounded-full"
							src={session?.image}
							alt={session?.name}
							width={40}
							height={40}
						/>
					</button>
				)}
				<button
					className="p-2.5 bg-gray-100 text-gray-600 dark:text-gray-400 dark:bg-gray-800 flex items-center justify-center w-5 h-5 box-content rounded-full"
					onClick={toggleTheme}
				>
					{resolvedTheme == 'light' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
				</button>
			</div>
			<motion.p
				layout
				transition={{ type: 'spring', stiffness: 500, damping: 30 }}
				className="text-sm text-gray-600 dark:text-gray-500 hidden md:inline"
			>
				Created by{' '}
				<a
					href="https://twitter.com/m1guelpf"
					target="_blank"
					className="text-twitter hover:underline"
					rel="noreferrer"
				>
					@m1guelpf
				</a>
				. Inspired by{' '}
				<a className="hover:underline" href="https://mute.vc" target="_blank" rel="noreferrer">
					mute.vc
				</a>
			</motion.p>
			<motion.div
				layout
				transition={{ type: 'spring', stiffness: 500, damping: 30 }}
				className="md:hidden flex flex-col items-center justify-center space-y-0.5"
			>
				<p className="text-xs text-gray-600 dark:text-gray-500">
					Created by{' '}
					<a
						href="https://twitter.com/m1guelpf"
						target="_blank"
						className="text-twitter hover:underline"
						rel="noreferrer"
					>
						@m1guelpf
					</a>
				</p>
				<p className="text-xs text-gray-600 dark:text-gray-500">
					Inspired by{' '}
					<a
						href="https://twitter.com/m1guelpf"
						target="_blank"
						className="text-twitter hover:underline"
						rel="noreferrer"
					>
						mute.vc
					</a>
				</p>
			</motion.div>
			{children}
		</footer>
	)
}

export default Toolbar
