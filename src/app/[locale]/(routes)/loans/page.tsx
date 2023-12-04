import React from 'react'
import NoLoansFound from './no-loans-found'
import Loans from './loans'
import LoanForm from './loan-form'
import { getLoans } from '@/lib/loan-db'

async function page() {
	let markup: JSX.Element

	const res = await getLoans()

	switch (res.success) {
		case false:
			markup = <NoLoansFound message={String(res.error)} />
			break
		default:
			switch (res.data.loans) {
				case undefined:
					markup = <NoLoansFound />
					break
				default:
					switch (res.data.results) {
						case 0:
							markup = <NoLoansFound />
							break
						default:
							markup = (
								<Loans loans={res.data.loans} results={res.data.results} />
							)
							break
					}
					break
			}
	}
	return (
		<>
			<LoanForm />
			{markup}
		</>
	)
}

export default page
