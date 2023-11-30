import { createLoanAction } from '@/app/_action';
import { TLoan } from '@/models/loan';

const sampleData: TLoan = {
	borrowerAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0A',
	collateralAmount: '100',
	collateralToken: '0x6B175474E89094C44Da98b954EedeAC495271d0B',
	loanAmount: '100',
	loanToken: '0x6B175474E89094C44Da98b954EedeAC495271d0C',
	loanRepayDeadline: new Date(2023 - 12 - 31),
	initialThreshold: '0.5',
	interestRate: '0.1',
	liquidationThreshold: '0.8',
	lenderAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0D',
	loanRequestDeadline: new Date(2023 - 12 - 31),
	managerNFT: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
	managerNFTVersion: 'v1',
};

const emptyData: TLoan = {
	borrowerAddress: '',
	collateralAmount: '',
	collateralToken: '',
	loanAmount: '',
	loanToken: '',
	loanRepayDeadline: new Date(),
	initialThreshold: '',
	interestRate: '',
	liquidationThreshold: '',
	lenderAddress: '',
	loanRequestDeadline: new Date(),
	managerNFT: '',
	managerNFTVersion: '',
};

export default function LoanForm() {
	async function action(data: FormData) {
		'use server';

		let _data: TLoan = emptyData;

		// loop through FormData and assign values to _data object which will be sent to server
		data.forEach((value, key) => (_data = { ..._data, [key]: value }));

		// Invoke server action to add new loan
		await createLoanAction({ params: _data, path: '/loans' });
	}

	return (
		<form
			action={action}
			key={Math.random()}
			className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center my-16"
		>
			<input
				type="text"
				name="collateralAmount"
				placeholder="Collateral Amount"
				className="border rounded px-2 py-1 flex-1"
			/>
			<input
				type="text"
				name="collateralToken"
				placeholder="Collateral Token"
				className="border rounded px-2 py-1 flex-1"
			/>
			<input
				type="text"
				name="loanAmount"
				placeholder="Loan Amount"
				className="border rounded px-2 py-1 flex-1"
			/>
			<input
				type="text"
				name="loanToken"
				placeholder="Loan Token"
				className="border rounded px-2 py-1 flex-1"
			/>
			<div className="flex gap-2">
				<label htmlFor="loanRepayDeadline">Loan Repay Deadline</label>
				<input
					type="date"
					name="loanRepayDeadline"
					placeholder="Loan Repay Deadline"
					className="border rounded px-2 py-1 flex-1"
				/>
			</div>
			<div className="flex gap-2">
				<label htmlFor="loanRequestDeadline">Loan Request Deadline</label>
				<input
					type="date"
					name="loanRequestDeadline"
					placeholder="Loan Request Deadline"
					className="border rounded px-2 py-1 flex-1"
				/>
			</div>
			<input
				type="text"
				name="initialThreshold"
				placeholder="Initial Threshold"
				className="border rounded px-2 py-1 flex-1"
			/>
			<input
				type="text"
				name="interestRate"
				placeholder="Interest Rate"
				className="border rounded px-2 py-1 flex-1"
			/>
			<input
				type="text"
				name="liquidationThreshold"
				placeholder="Liquidation Threshold"
				className="border rounded px-2 py-1 flex-1"
			/>
			<input
				type="text"
				name="borrowerAddress"
				placeholder="Borrower Address"
				className="border rounded px-2 py-1 flex-1"
			/>
			<input
				type="text"
				name="lenderAddress"
				placeholder="Lender Address"
				className="border rounded px-2 py-1 flex-1"
			/>
			<input
				type="text"
				name="managerNFT"
				placeholder="Manager NFT"
				className="border rounded px-2 py-1 flex-1"
			/>
			<input
				type="text"
				name="managerNFTVersion"
				placeholder="Manager NFT Version"
				className="border rounded px-2 py-1 flex-1"
			/>

			<button className="px-4 py-1 text-white rounded bg-green-500">Add</button>
		</form>
	);
}
