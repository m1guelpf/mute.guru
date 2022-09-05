import useSWR from 'swr'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'
import { HOURS } from '@/lib/consts'
import { GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import { getClient } from '@/lib/twitter'
import { Account } from '@/types/twitter'
import useSession from '@/hooks/useSession'
import NavBar, { Tab } from '@/components/NavBar'
import { muteAccount, unmuteAccount } from '@/lib/utils'
import { FC, memo, useCallback, useMemo, useState } from 'react'
const Toolbar = dynamic(() => import('@/components/Toolbar'), { ssr: false })
const AccountList = dynamic(() => import('@/components/AccountList'), { ssr: false })

const fetcher = (url: string) => {
	return fetch(url).then(async res => {
		if (res.ok) return res.json()

		throw await res.text()
	})
}

const Dashboard: FC<{ accounts: Account[] }> = ({ accounts }) => {
	const session = useSession()
	const [tab, setTab] = useState<'unmuted' | 'muted'>('unmuted')
	const {
		mutate,
		isLoading,
		data: muted,
	} = useSWR('/api/muted', fetcher, {
		revalidateOnFocus: false,
		shouldRetryOnError: false,
		onError: error => toast.error(`${error}. Please try again later.`),
	})

	const filteredAccounts = useMemo<Account[]>(() => {
		if (!muted) return []

		return accounts
			.filter(account => account.name != session?.name)
			.filter(account => (tab == 'muted' ? muted.includes(account.id_str) : !muted.includes(account.id_str)))
	}, [accounts, muted, tab, session])

	const toggleMuteAll = useCallback(async () => {
		if (!filteredAccounts) throw toast.error('Please wait for your muted accounts to load.')

		await Promise.all(
			filteredAccounts.map(async account => {
				if (tab == 'muted') {
					await unmuteAccount(account)

					mutate(mutedAccounts => mutedAccounts.filter(id => id != account.id_str), { revalidate: false })
				}

				await muteAccount(account)
				mutate(mutedAccounts => mutedAccounts.concat(account.id_str), { revalidate: false })
			})
		)

		toast.success(tab == 'muted' ? 'Unmuted everyone!' : 'Muted everyone!')
	}, [mutate, filteredAccounts, tab])

	return (
		<div className="bg-gray-100 dark:bg-black">
			<div className="md:max-w-xl md:mx-auto bg-white dark:bg-black md:h-screen border-x dark:border-gray-800 flex flex-col">
				<NavBar>
					<Tab active={tab == 'unmuted'} onClick={() => setTab('unmuted')}>
						Unmuted
					</Tab>
					<Tab active={tab == 'muted'} onClick={() => setTab('muted')}>
						Muted
					</Tab>
				</NavBar>
				<main className="pb-14 flex-1 md:overflow-y-scroll">
					<AccountList accounts={filteredAccounts} tab={tab} isLoading={isLoading} />
				</main>
				<Toolbar>
					<motion.button
						layout
						transition={{ type: 'spring', stiffness: 500, damping: 30 }}
						onClick={toggleMuteAll}
						className="bg-black dark:bg-white text-white dark:text-black hover:bg-red-500 dark:hover:bg-red-500 dark:hover:text-white py-2 px-4 font-semibold text-sm rounded-full"
					>
						{tab == 'muted' ? 'Unmute' : 'Mute'} all
					</motion.button>
				</Toolbar>
			</div>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const {
		data: { users: accounts },
	} = (await getClient().get('lists/members', {
		count: 5000,
		skip_status: true,
		include_entities: false,
		list_id: process.env.TWITTER_LIST_ID,
	})) as { data: { users: Account[] } }

	return {
		props: {
			accounts,
		},
		revalidate: 2 * HOURS,
	}
}

export default memo(Dashboard)
