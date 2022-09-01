import Image from 'next/image'
import { useSWRConfig } from 'swr'
import Autolinker from 'autolinker'
import { motion } from 'framer-motion'
import { Account } from '@/types/twitter'
import { TWEET_LINK } from '@/lib/consts'
import TwitterIcon from './Icons/TwitterIcon'
import Skeleton from 'react-loading-skeleton'
import { FC, memo, useCallback, useMemo } from 'react'
import { muteAccount, unmuteAccount } from '@/lib/utils'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'

type Props = {
	isLoading: boolean
	accounts: Account[]
	tab: 'muted' | 'unmuted'
}

const AccountList: FC<Props> = ({ accounts, tab, isLoading }) => {
	if (accounts.length == 0 && !isLoading) {
		return (
			<div className="flex flex-col items-center justify-center px-4 py-4 space-y-10 text-gray-600 dark:text-gray-500 h-[90vh] md:h-full">
				<div className="space-y-4 flex flex-col items-center justify-center">
					{tab === 'unmuted' ? (
						<SpeakerXMarkIcon className="w-10 h-10" />
					) : (
						<SpeakerWaveIcon className="w-10 h-10" />
					)}
					<p className="font-medium">
						{tab === 'unmuted' ? 'You’ve muted all the threadooors.' : 'You haven’t muted anyone yet.'}
					</p>
				</div>
				{tab === 'unmuted' && (
					<>
						<motion.a
							target="_blank"
							href={TWEET_LINK}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="bg-twitter text-white rounded-full py-2 px-4 flex items-center space-x-1"
						>
							<TwitterIcon className="w-6 h-6" />
							<span>Share on Twitter</span>
						</motion.a>
						<p className="text-sm">
							Missed someone?{' '}
							<a target="_blank" rel="noreferrer" className="underline" href="https://dm.link/m1guelpf">
								Suggest an account
							</a>
							.
						</p>
					</>
				)}
			</div>
		)
	}

	return (
		<ul className="divide-y dark:divide-gray-800 border-b dark:border-gray-800">
			{(isLoading ? [...Array(5)] : accounts).map((account, i) => (
				<AccountCell account={account} tab={tab} key={account?.id_str ?? i} />
			))}
		</ul>
	)
}

const AccountCell: FC<{ account: Account; tab: 'muted' | 'unmuted' }> = memo(({ account, tab }) => {
	const { mutate } = useSWRConfig()

	const toggleMute = useCallback(async () => {
		if (!account) return

		mutate(
			'/api/muted',
			async mutedAccounts => {
				if (tab == 'muted') {
					await unmuteAccount(account)

					return mutedAccounts.filter(id => id != account.id_str)
				}

				await muteAccount(account)
				return mutedAccounts.concat(account.id_str)
			},
			{ revalidate: false }
		)
	}, [account, tab, mutate])

	const accountBio = useMemo<string>(() => {
		if (!account) return

		let bio = account.description

		for (const url of account.entities.description.urls) {
			bio = bio.replace(url.url, url.expanded_url.replace('http://', 'https://'))
		}

		return Autolinker.link(bio, {
			newWindow: true,
			mention: 'twitter',
			hashtag: 'twitter',
			className: 'text-twitter hover:underline',
		})
	}, [account])

	return (
		<li className="py-3 px-3 flex items-center space-x-4">
			<div className="flex-shrink-0">
				{account ? (
					<a href={`https://twitter.com/${account.screen_name}`} target="_blank" rel="noreferrer">
						<Image
							width={40}
							height={40}
							alt={account.name}
							className="rounded-full"
							src={account.profile_image_url_https}
						/>
					</a>
				) : (
					<Skeleton width={40} height={40} circle />
				)}
			</div>
			<div className="flex-1">
				<div className="flex justify-between">
					<div className="flex-1">
						<div className="flex items-center space-x-1">
							<p className="font-medium">{account?.name ?? <Skeleton width={120} />}</p>
							{account?.verified && <CheckBadgeIcon className="w-4 h-4 text-twitter" />}
						</div>
						<div className="-mt-1.5">
							<a
								className="text-gray-500 text-sm hover:underline"
								href={account ? `https://twitter.com/${account.screen_name}` : '#'}
							>
								{account ? `@${account.screen_name}` : <Skeleton width={60} />}
							</a>
						</div>
						{account ? (
							<p className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: accountBio }} />
						) : (
							<div className="mt-1">
								<Skeleton count={2} width="90%" />
							</div>
						)}
					</div>
					<div className="flex-shrink-0">
						{account ? (
							<button
								onClick={toggleMute}
								className="bg-twitter hover:bg-red-500 text-white py-2 px-4 font-semibold text-sm rounded-full"
							>
								{tab === 'muted' ? 'Unmute' : 'Mute'}
							</button>
						) : (
							<Skeleton height={30} width={60} />
						)}
					</div>
				</div>
			</div>
		</li>
	)
})
AccountCell.displayName = 'AccountCell'

export default memo(AccountList)
