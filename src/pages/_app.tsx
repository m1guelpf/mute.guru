import '@/styles/styles.css'
import { Scroll } from 'scrollex'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'
import MetaTags from '@/components/MetaTags'
import SkeletonProvider from '@/components/SkeletonProvider'

const App = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute="class">
			<SkeletonProvider>
				<MetaTags />
				<Toaster />
				<Scroll.Container className="h-screen">
					<Scroll.Section className="h-screen">
						<Component {...pageProps} />
					</Scroll.Section>
				</Scroll.Container>
			</SkeletonProvider>
		</ThemeProvider>
	)
}

export default App
