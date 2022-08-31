import { classNames } from '@/lib/utils'
import { FC, HTMLProps, PropsWithChildren } from 'react'
import { motion, MotionValue, useMotionTemplate, useTransform } from 'framer-motion'

type Props = HTMLProps<HTMLDivElement> &
	PropsWithChildren<{
		loopDuration: number
		clock: MotionValue<number>
	}>

const InfiniteScroll: FC<Props> = ({ clock, className, loopDuration = 12000, children, ...props }) => {
	const progress = useTransform(clock, time => (time % loopDuration) / loopDuration)
	const percentage = useTransform(progress, t => t * 100)
	const translateX = useMotionTemplate`-${percentage}%`

	return (
		<div className={classNames(className, 'relative inline-block overflow-hidden')} {...props}>
			<motion.div style={{ translateX }}>
				<div>{children}</div>
				<div className="absolute w-full h-full left-full top-0">{children}</div>
			</motion.div>
		</div>
	)
}

export default InfiniteScroll
