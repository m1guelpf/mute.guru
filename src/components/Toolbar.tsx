import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeSwitcher'
import useSession from '@/hooks/useSession'
import { FC, PropsWithChildren } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

type Props = PropsWithChildren<{}>

const Toolbar: FC<Props> = ({ children }) => {
	const session = useSession()
	const { resolvedTheme, toggleTheme } = useTheme()

	return (
		<footer className="bg-white dark:bg-black border-t dark:border-gray-800 flex items-center justify-between w-full md:max-w-xl md:mx-auto md:px-4 px-3 py-2">
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
					className="p-2.5 bg-gray-200 dark:bg-gray-800 flex items-center justify-center w-5 h-5 box-content rounded-full"
					onClick={toggleTheme}
				>
					{resolvedTheme == 'light' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
				</button>
			</div>
			<div className="">
				<motion.p
					layout
					transition={{ type: 'spring', stiffness: 500, damping: 30 }}
					className="text-sm text-gray-600 dark:text-gray-500"
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
			</div>
			{children}
		</footer>
	)
}

export default Toolbar
