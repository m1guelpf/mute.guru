/* eslint-disable @next/next/no-server-import-in-page */
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { NextURL } from 'next/dist/server/web/next-url'

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.APP_KEY })

	if (!token && req.nextUrl.pathname == '/dashboard') {
		return rewriteTo('/', req.nextUrl)
	}

	if (token && req.nextUrl.pathname == '/') {
		return rewriteTo('/dashboard', req.nextUrl)
	}
}

export const config = {
	matcher: ['/', '/dashboard'],
}

const rewriteTo = (path: string, url: NextURL): NextResponse => {
	url.pathname = path

	return NextResponse.rewrite(url)
}
