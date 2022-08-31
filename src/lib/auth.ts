import toast from 'react-hot-toast'
import { getCsrfToken, SignInAuthorizationParams, SignInOptions } from 'next-auth/react'

export async function signIn(options?: SignInOptions, authorizationParams?: SignInAuthorizationParams): Promise<void> {
	const { url } = await fetch(`api/auth/signin/twitter?${new URLSearchParams(authorizationParams)}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ csrfToken: await getCsrfToken(), json: 'true' }),
	}).then(res => res.json())

	if ((url as string).includes('OAuthSignin')) {
		throw toast.error('There was an error signing in with Twitter. Please try again later.')
	}

	window.location.href = url
}
