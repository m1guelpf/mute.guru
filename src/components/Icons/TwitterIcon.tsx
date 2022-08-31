import { FC, SVGProps } from 'react'

const TwitterIcon: FC<SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => (
	<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			d="M9.31 18.25c5.472 0 8.464-4.81 8.464-8.98 0-.233.166-.44.378-.536.728-.33 1.673-1.235.697-2.756-.646.348-1.177.538-1.889.766-1.126-1.27-3.01-1.331-4.209-.136-.772.77-1.1 1.919-.86 3.015-2.392-.127-5.193-1.887-6.704-3.86-.789 1.443-.386 3.288.921 4.215a2.828 2.828 0 0 1-1.35-.395v.04c0 1.503.999 2.796 2.386 3.094a2.8 2.8 0 0 1-1.343.054c.39 1.285 2.079 2.728 3.352 2.753a5.758 5.758 0 0 1-3.695 1.354c-.237 0-.473-.015-.708-.045a8.073 8.073 0 0 0 4.56 1.415v.002Z"
		/>
	</svg>
)

export default TwitterIcon
