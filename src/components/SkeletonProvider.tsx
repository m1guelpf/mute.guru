import { useTheme } from 'next-themes'
import { FC, PropsWithChildren } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

const SkeletonProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const { resolvedTheme } = useTheme()

	return (
		<SkeletonTheme
			baseColor={resolvedTheme === 'light' ? '#00000010' : '#ffffff10'}
			highlightColor={resolvedTheme === 'light' ? '#00000040' : '#ffffff20'}
			width={100}
		>
			{children}
		</SkeletonTheme>
	)
}

export default SkeletonProvider
