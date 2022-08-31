import dynamic from 'next/dynamic'
import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import useSession from '@/hooks/useSession'
import { BoltIcon, ClockIcon, SignalIcon } from '@heroicons/react/24/outline'
const ThemeSwitcher = dynamic(() => import('@/components/ThemeSwitcher'), { ssr: false })

const Landing: FC = () => {
	const router = useRouter()
	const session = useSession()

	useEffect(() => {
		if (session.status != 'authenticated') return

		router.push('/dashboard')
	}, [router, session.status])

	return (
		<div className="min-h-screen dark:bg-black flex flex-col">
			<ThemeSwitcher className="fixed bottom-3 lg:bottom-auto lg:top-3 right-3" />
			<main className="mt-24 flex flex-col items-center justify-center space-y-8 flex-1 px-10">
				<h1 className="dark:text-white font-bold text-center text-4xl">
					Free your Twitter feed from threadooors
				</h1>
				<p className="text-gray-500 dark:text-gray-400 text-center text-lg max-w-xs mx-auto">
					Silence engagement farmers from your feed
				</p>
				<button
					onClick={() => signIn('twitter')}
					className="bg-twitter text-white py-3 w-full max-w-xs mx-auto rounded"
				>
					Continue with Twitter
				</button>
				<div className="!my-24 flex flex-col lg:flex-row items-center justify-between space-y-14 lg:space-y-0 lg:space-x-10">
					<div className="max-w-md space-y-4">
						<div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-full inline-flex items-center justify-center">
							<SignalIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
						</div>
						<div className="space-y-1">
							<p className="dark:text-white font-medium text-lg">Cut through noise</p>
							<p className="text-gray-500 max-w-xs text-sm">
								Builders spend more time building and less time tweeting — don’t miss their tweets in a
								jumble of nonsense.
							</p>
						</div>
					</div>
					<div className="max-w-md space-y-4">
						<div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-full inline-flex items-center justify-center">
							<BoltIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
						</div>
						<div className="space-y-1">
							<p className="dark:text-white font-medium text-lg">Built for speed</p>
							<p className="text-gray-500 max-w-xs text-sm">
								Blazing fast mute and unmute so you can switch on and off investor chatter whenever
								you’d like.
							</p>
						</div>
					</div>
					<div className="max-w-md space-y-4">
						<div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-full inline-flex items-center justify-center">
							<ClockIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
						</div>
						<div className="space-y-1">
							<p className="dark:text-white font-medium text-lg">More quality time</p>
							<p className="text-gray-500 max-w-xs text-sm">
								Less threads means less content to consume and more time to do literally anything else.
							</p>
						</div>
					</div>
				</div>
			</main>
			<footer className="bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-800 p-6 flex items-center justify-between z-10">
				<p className="text-sm text-gray-500">Designed in Berlin 🇩🇪</p>
				<div className="flex items-center space-x-4">
					<a
						target="_blank"
						rel="noreferrer"
						href="https://twitter.com/m1guelpf"
						className="text-gray-500 text-sm hover:underline"
					>
						Twitter
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/m1guelpf/mute.guru"
						className="text-gray-500 text-sm hover:underline"
					>
						GitHub
					</a>
				</div>
			</footer>
		</div>
	)
}

export default Landing
