import { motion } from 'framer-motion'

const SunIcon = ({ className = '' }) => (
	<motion.svg
		key="sun"
		fill="currentColor"
		viewBox="0 0 24 24"
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		whileTap={{ scale: 0.95, rotate: 15 }}
		style={{ originX: '50%', originY: '50%' }}
	>
		<motion.circle
			cx="12"
			cy="12"
			r="5.754"
			initial={{ scale: 1.5 }}
			animate={{ scale: 1, transition: { stiffness: 200, damping: 10 } }}
		/>
		<motion.g initial={{ rotate: 45 }} animate={{ rotate: 0, transition: { stiffness: 200, damping: 10 } }}>
			<circle cx="3.09" cy="6.855" r="1.711" transform="rotate(-60 3.09 6.855)" />
			<circle cx="3.09" cy="17.144" r="1.711" transform="rotate(-120 3.09 17.144)" />
			<circle cx="12" cy="22.288" r="1.711" />
			<circle cx="20.91" cy="17.144" r="1.711" transform="rotate(-60 20.91 17.144)" />
			<circle cx="20.91" cy="6.856" r="1.711" transform="rotate(-120 20.91 6.856)" />
			<circle cx="12" cy="1.711" r="1.711" />
		</motion.g>
	</motion.svg>
)

export default SunIcon
