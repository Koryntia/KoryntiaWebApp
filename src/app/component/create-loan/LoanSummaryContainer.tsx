import type { ReactNode } from 'react'
import React from 'react'

interface LoanSummaryContainerProps {
	children: ReactNode
	title: string
}

function LoanSummaryContainer({ children, title }: LoanSummaryContainerProps) {
	return (
		<div className="w-full mx-auto">
			<h3 className="text-textBlack font-bold leading-[23.4px] my-2">{title}</h3>
			{children}
		</div>
	)
}

export default LoanSummaryContainer
