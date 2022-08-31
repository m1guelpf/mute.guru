import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { TWEET_SKELETON } from '@/lib/consts'
import InfiniteScroll from './InfiniteScroll'
import { useScrollClock } from '@/hooks/scrollex'
import { randomItem, randomNumber } from '@/lib/utils'

const generateTweet = () => `More than ${randomNumber(1, 9)} ${randomItem(TWEET_SKELETON.amount)} people ${randomItem(
	TWEET_SKELETON.action
)}.

But ${randomItem(TWEET_SKELETON.issue)}.

Here are ${randomNumber(5, 15)} ${randomItem(TWEET_SKELETON.resolution)}: 🧵`

const RandomThread = ({ tweet }) => {
	return (
		<motion.div
			transition={{ type: 'spring', stiffness: 500, damping: 50 }}
			className="w-[32rem] shadow border dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-gray-900"
		>
			<p className="whitespace-pre-line">{tweet}</p>
		</motion.div>
	)
}

export const RenderThreads = ({ amount, content }) => {
	const threads = useMemo(
		() => Array.from({ length: amount }, (_, i) => <RandomThread key={i} tweet={content[i]} />),
		[amount, content]
	)

	return <>{threads}</>
}

export const ThreadCarousel = () => {
	const cardCount = useMemo<number>(() => {
		if (window.innerWidth < 768) return 2
		if (window.innerWidth < 1024) return 5
		if (window.innerWidth < 1710) return 4

		return 10
	}, [])

	const clock = useScrollClock({ scrollAccelerationFactor: 5 })
	const threads = useMemo<string[]>(() => Array.from({ length: cardCount }, generateTweet), [cardCount])

	return (
		<InfiniteScroll clock={clock} loopDuration={cardCount * 2000} className="transform rotate-12 scale-105">
			<div className="flex gap-x-4 mr-4 py-4">
				<RenderThreads amount={cardCount} content={threads} />
			</div>
		</InfiniteScroll>
	)
}

export default RandomThread
