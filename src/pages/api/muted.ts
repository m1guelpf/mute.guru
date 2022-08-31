import { getClient } from '@/lib/twitter'
import { authOptions } from './auth/[...nextauth]'
import { Session, unstable_getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

type TwitterSession = Session & {
	accessToken: string
	accessTokenSecret: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != 'GET') return res.status(405).end()

	const session = (await unstable_getServerSession(req, res, authOptions)) as TwitterSession
	if (!session) return res.status(401).end()
	const twitter = getClient(session)

	try {
		const {
			data: { ids },
		} = (await twitter.get('mutes/users/ids', { stringify_ids: true })) as { data: { ids: string[] } }

		res.status(200).json(ids)
	} catch (error) {
		res.status(401).send(error.message)
	}
}

export default handler
