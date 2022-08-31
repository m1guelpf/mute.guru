import Head from 'next/head'

const MetaTags = () => {
	const meta = {
		url: 'https://mute.guru',
		title: 'Take back your feed | mute.guru',
		description:
			'Obliterate all the 🧵👇  from your feed with one-click, and go back to enjoying the content you actually care about.',
		image: '',
	}

	return (
		<Head>
			<title>{meta.title}</title>
			<meta name="title" content={meta.title} />
			<meta name="description" content={meta.description} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={meta.url} />
			<meta property="og:title" content={meta.title} />
			<meta property="og:description" content={meta.description} />
			<meta property="og:image" content={meta.url + meta.image} />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={meta.url} />
			<meta property="twitter:title" content={meta.title} />
			<meta property="twitter:description" content={meta.description} />
			<meta property="twitter:image" content={meta.url + meta.image} />
		</Head>
	)
}

export default MetaTags
