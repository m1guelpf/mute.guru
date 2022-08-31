import { Account } from '@/types/twitter'
import toast from 'react-hot-toast'

export const classNames = (...classes: string[]): string => {
	return classes.filter(Boolean).join(' ')
}

export const muteAccount = async (account: Account) => {
	return toast.promise(
		fetch('/api/mute', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: account.id_str }),
		}).then(res => res.json()),
		{
			success: `Muted @${account.screen_name}!`,
			loading: `Muting @${account.screen_name}...`,
			error: 'Error muting account. Try again in a few minutes.',
		}
	)
}

export const unmuteAccount = async (account: Account) => {
	return toast.promise(
		fetch('/api/mute', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: account.id_str }),
		}).then(res => res.json()),
		{
			success: `Unmuted @${account.screen_name}!`,
			loading: `Unmuting @${account.screen_name}...`,
			error: 'Error unmuting account. Try again in a few minutes.',
		}
	)
}
