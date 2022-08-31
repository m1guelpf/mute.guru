import { classNames } from '@/lib/utils'
import { motion } from 'framer-motion'

const NavBar = ({ children }) => {
	return <header className="bg-white dark:bg-black border-b dark:border-gray-800 flex">{children}</header>
}

export const Tab = ({ children, onClick, active }) => {
	return (
		<motion.button
			onClick={onClick}
			className={classNames(
				active ? 'text-twitter' : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900 transition',
				'relative font-semibold text-sm flex-1 h-full py-4'
			)}
			disabled={active}
		>
			{active && (
				<motion.div
					layoutId="active"
					transition={{ type: 'spring', stiffness: 500, damping: 50 }}
					className="absolute inset-0 border-b-2 border-twitter"
				/>
			)}
			{children}
		</motion.button>
	)
}

export default NavBar