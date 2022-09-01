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
				<Component {...pageProps} />
			</SkeletonProvider>
		</ThemeProvider>
	)
}

export default App
