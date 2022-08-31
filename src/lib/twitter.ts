import Twit from 'twit'

type Session = {
	accessToken: string
	accessTokenSecret: string
}

export const getClient = (session?: Session): Twit => {
	return new Twit({
		consumer_key: process.env.TWITTER_ID,
		consumer_secret: process.env.TWITTER_SECRET,
		access_token: session?.accessToken ?? process.env.TWITTER_TOKEN,
		access_token_secret: session?.accessTokenSecret ?? process.env.TWITTER_TOKEN_SECRET,
	})
}
