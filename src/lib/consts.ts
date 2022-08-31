import { randomNumber } from './utils'

export const APP_NAME = 'dApp Starter'

export const HOURS = 60 * 60

export const TWEET_SKELETON = {
	amount: ['billion', 'million', 'thousand'],
	action: [
		'use Google Drive every day',
		'have watched a TED talk',
		'use Google every day',
		'use Google Chrome every day',
		'use Smartphones every day',
		'use Google, YouTube, & Apple products every day',
	],
	issue: [
		'most people suck at it',
		'no one uses it effectively',
		'most people don’t use them right',
		'no one is using them effectively',
		'most people don’t know their full power',
		`${randomNumber(20, 100)}.${randomNumber(0, 99)}% of people don't know how to do it properly`,
	],
	resolution: [
		'to use Google more effectively',
		'apps you shouldn’t live without',
		'tips to take your tech game to the next level',
		'tips & tricks you should know',
		'TED talks that’ll change the way you think forever',
		'Chrome extensions so useful you’ll wonder how you lived without them',
		'Chrome extensions you should know',
		'Chrome extensions so useful you’ll install them right away',
		'apps that’ll give you hundreds of hours of your life back',
	],
}

export const TWEET_LINK = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
	'🔇 Just freed my timeline from engagement farmers using mute.guru by @m1guelpf'
)}`
