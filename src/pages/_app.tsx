import '@/styles/styles.css'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'
import SkeletonProvider from '@/components/SkeletonProvider'

const App = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute="class">
			<SkeletonProvider>
				<Toaster />
				<Component {...pageProps} />
			</SkeletonProvider>
		</ThemeProvider>
	)
}

export default App
