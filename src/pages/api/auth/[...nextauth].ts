import NextAuth, { NextAuthOptions } from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'

export const authOptions: NextAuthOptions = {
	secret: process.env.APP_KEY,
	providers: [
		TwitterProvider({
			clientId: process.env.TWITTER_ID,
			clientSecret: process.env.TWITTER_SECRET,
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.oauth_token
				token.accessTokenSecret = account.oauth_token_secret
			}

			return token
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken
			session.accessTokenSecret = token.accessTokenSecret

			return session
		},
	},
}

export default NextAuth(authOptions)
