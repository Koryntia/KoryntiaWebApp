import React, { FC } from 'react';
import { _TLoan } from '@/models/loan';

type Props = {
	loans: _TLoan[];
};
const Loans: FC<Props> = ({ loans }) => {
	return (
		<section className="space-y-16">
			{loans.map((loan) => (
				<dl
					key={loan.id}
					className="grid grid-cols-2 md:grid-cols-4 place-items-start text-sm sm:text-base [&>*]:w-full [&>*]:border-b-2 [&>*]:border-dotted [&>*]:py-2 [&>*]:max-w-sm [&>*]:truncate gap-x-4"
				>
					<dt>ID:</dt>
					<dd>{loan.id}</dd>
					<dt>Borrower Address:</dt>
					<dd>{loan.borrowerAddress}</dd>
					<dt>Lender Address:</dt>
					<dd>{loan.lenderAddress}</dd>
					<dt>Collateral Amount:</dt>
					<dd>{loan.collateralAmount}</dd>
					<dt>Collateral Token:</dt>
					<dd>{loan.collateralToken}</dd>
					<dt>Loan Amount:</dt>
					<dd>{loan.loanAmount}</dd>
					<dt>Loan Token:</dt>
					<dd>{loan.loanToken}</dd>
					<dt>Loan Repay Deadline:</dt>
					<dd>{new Date(loan.loanRepayDeadline).toLocaleDateString()}</dd>
					<dt>Loan Request Deadline:</dt>
					<dd>{new Date(loan.loanRequestDeadline).toLocaleDateString()}</dd>
					<dt>Initial Threshold:</dt>
					<dd>{loan.initialThreshold}</dd>
					<dt>Interest Rate:</dt>
					<dd>{loan.interestRate}</dd>
					<dt>Manager NFT</dt>
					<dd>{loan.managerNFT}</dd>
					<dt>Manager NFT Version</dt>
					<dd>{loan.managerNFTVersion}</dd>
				</dl>
			))}
		</section>
	);
};

export default Loans;
