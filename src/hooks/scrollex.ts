import { useEffect, useState } from 'react'
import { useAnimationFrame, useMotionValue, useTransform } from 'framer-motion'
import { useScrollState, useScrollValue } from 'scrollex'

type ScrollDirection = 'up' | 'down'
type ScrollStatus = ScrollDirection | 'static'

const useScrollStatus = (): ScrollStatus => {
	const status = useScrollState(({ velocity }) => {
		if (velocity > 0) return 'down'
		if (velocity < 0) return 'up'

		return 'static'
	})

	return status || 'static'
}

const useLastScrollDirection = (): ScrollDirection => {
	const scrollStatus = useScrollStatus()
	const [lastDirection, setLastDirection] = useState<ScrollDirection>('down')

	useEffect(() => {
		if (!['up', 'down'].includes(scrollStatus)) return

		setLastDirection(scrollStatus as 'up' | 'down')
	}, [scrollStatus])

	return lastDirection
}

const useScrollPosition = () => useScrollValue(({ position }) => position)

const useClock = ({ defaultValue = 0, reverse = false } = {}) => {
	const rawClock = useMotionValue(0)
	const clock = useMotionValue(defaultValue)

	useAnimationFrame(t => {
		const dt = t - rawClock.get()
		rawClock.set(rawClock.get() + dt)

		if (reverse) clock.set(clock.get() - dt)
		else clock.set(clock.get() + dt)
	})

	return clock
}

export const useScrollClock = ({ scrollAccelerationFactor = 10 } = {}) => {
	const scrollPosition = useScrollPosition()
	const lastScrollDirection = useLastScrollDirection()

	const clock = useClock({ defaultValue: Date.now(), reverse: lastScrollDirection === 'up' })

	return useTransform([clock, scrollPosition], ([time, pos]: number[]) => time + pos * scrollAccelerationFactor)
}
