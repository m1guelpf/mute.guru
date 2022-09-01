import useSWR from 'swr'
import { Session } from 'next-auth'
import { useCallback, useEffect } from 'react'
import { signOut } from 'next-auth/react'

type Data = {
	name?: string
	image?: string
	logOut: () => void
	status: 'loading' | 'authenticated' | 'unauthenticated'
}

const fetcher = url => fetch(url, { credentials: 'include' }).then(res => res.json())

const useSession = (): Data => {
	const { data, isLoading, mutate } = useSWR<Session>('/api/auth/session', fetcher)

	const logOut = useCallback(async () => {
		await signOut({ callbackUrl: '/' })

		mutate(null, true)
	}, [mutate])

	useEffect(() => {
		if (!data?.expires || new Date(data.expires) > new Date()) return

		logOut()
	}, [data, logOut])

	return {
		logOut,
		...data?.user,
		status: isLoading ? 'loading' : data?.expires ? 'authenticated' : 'unauthenticated',
	}
}

export default useSession
