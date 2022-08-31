export type Account = {
	name: string
	id_str: string
	verified: boolean
	description: string
	screen_name: string
	profile_image_url_https: string
	entities: {
		description: {
			urls: Array<{ url: string; expanded_url: string }>
		}
	}
}
