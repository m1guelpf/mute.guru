import { getClient } from '@/lib/twitter'
import { authOptions } from './auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session, unstable_getServerSession } from 'next-auth'

type TwitterSession = Session & {
	accessToken: string
	accessTokenSecret: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = (await unstable_getServerSession(req, res, authOptions)) as TwitterSession
	if (!session) return res.status(401).end()

	switch (req.method) {
		case 'POST':
			return muteAccount(req, res, session)

		case 'DELETE':
			return unmuteAccount(req, res, session)

		default:
			return res.status(405).end()
	}
}

const muteAccount = async (req: NextApiRequest, res: NextApiResponse, session: TwitterSession) => {
	const twitter = getClient(session)

	try {
		await twitter.post('mutes/users/create', { user_id: req.body.id })

		return res.status(200).json({ success: true })
	} catch (error) {
		res.status(401).send(error.message)
	}
}

const unmuteAccount = async (req: NextApiRequest, res: NextApiResponse, session: TwitterSession) => {
	const twitter = getClient(session)

	try {
		await twitter.post('mutes/users/destroy', { user_id: req.body.id })

		return res.status(200).json({ success: true })
	} catch (error) {
		res.status(401).send(error.message)
	}
}

export default handler
