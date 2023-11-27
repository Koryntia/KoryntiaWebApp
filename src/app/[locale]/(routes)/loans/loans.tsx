import type { Loan } from '@/lib/loan-db';
import React, { FC } from 'react';

type Props = {
	loans: Loan[];
};
const Loans: FC<Props> = ({ loans }) => {
	return (
		<section>
			{loans.map((loan) => (
				<div key={loan.id}>
					<p>{loan.id}</p>
					<p>{loan.loanAmount}</p>
					<p>{new Date(loan.loanRepayDeadline).getFullYear()}</p>
				</div>
			))}
		</section>
	);
};

export default Loans;
