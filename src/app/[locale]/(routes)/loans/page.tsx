import { getLoans } from '@/lib/loan-db';
import React from 'react';
import NoLoansFound from './no-loans-found';
import Loans from './loans';

const page = async () => {
	const { loans, results } = await getLoans();

	console.log(loans, results);

	let markup: JSX.Element;

	switch (loans) {
		case undefined:
			markup = <NoLoansFound />;
			break;
		default:
			switch (results) {
				case 0:
					markup = <NoLoansFound />;
					break;
				default:
					markup = <Loans loans={loans} />;
					break;
			}
	}
	return <>{markup}</>;
};

export default page;
