import React from 'react'

interface LoanSummaryProps {
	title: string
	amount: string
}

function LoanSummary({ title, amount }: LoanSummaryProps) {
	return (
		<>
			<div className="flex justify-between">
				<p className="text-black2">{title}</p>
				<p className="text-textBlack font-semibold">{amount}</p>
			</div>
		</>
	)
}

export default LoanSummary
