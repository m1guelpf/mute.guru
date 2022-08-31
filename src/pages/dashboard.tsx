import useSWR from 'swr'
import toast from 'react-hot-toast'
import { HOURS } from '@/lib/consts'
import { GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { getClient } from '@/lib/twitter'
import { Account } from '@/types/twitter'
import Toolbar from '@/components/Toolbar'
import useSession from '@/hooks/useSession'
import NavBar, { Tab } from '@/components/NavBar'
import AccountList from '@/components/AccountList'
import { muteAccount, unmuteAccount } from '@/lib/utils'
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'

const fetcher = (url: string) => {
	return fetch(url).then(async res => {
		if (res.ok) return res.json()

		throw await res.text()
	})
}

const Dashboard: FC<{ accounts: Account[] }> = ({ accounts }) => {
	const router = useRouter()
	const session = useSession()
	const [tab, setTab] = useState<'unmuted' | 'muted'>('unmuted')
	const {
		data: muted,
		isLoading,
		mutate,
	} = useSWR('/api/muted', fetcher, {
		revalidateOnFocus: false,
		shouldRetryOnError: false,
		onError: error => toast.error(`${error}. Please try again later.`),
	})

	useEffect(() => {
		if (session.status != 'unauthenticated') return

		router.push('/')
	}, [router, session.status])

	const filteredAccounts = useMemo<Account[]>(() => {
		if (!muted) return []

		return accounts.filter(account =>
			tab == 'muted' ? muted.includes(account.id_str) : !muted.includes(account.id_str)
		)
	}, [accounts, muted, tab])

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
			<div className="md:max-w-xl md:mx-auto bg-white dark:bg-black h-screen border-x dark:border-gray-800 flex flex-col">
				<NavBar>
					<Tab active={tab == 'unmuted'} onClick={() => setTab('unmuted')}>
						Unmuted
					</Tab>
					<Tab active={tab == 'muted'} onClick={() => setTab('muted')}>
						Muted
					</Tab>
				</NavBar>
				<main className="pb-16 flex-1 overflow-y-scroll">
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
