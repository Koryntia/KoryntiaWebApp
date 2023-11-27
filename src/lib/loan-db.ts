import { Loan } from '@/models/loan';
import connectDB from './db';
import { stringToObjectId } from './utils';

export type LoanFilter = {
	page?: number;
	limit?: number;
};

export type Loan = {
	lenderAddress: string;
	loanToken: string;
	loanAmount: string;
	collateralToken: string;
	collateralAmount: string;
	liquidationThreshold: string;
	initialThreshold: string;
	loanRepayDeadline: Date;
	loanRequestDeadline: Date;
	interestRate: string;
	managerNFT: string;
	managerNFTVersion: string;
};

/**
 * We can use this function to get loans from the database
 * We invoke the .lean() method on the query to convert the returned documents to plain JavaScript objects instead of mongoDB documents.
 * @param filter The filter to apply to the query
 * @returns The loans that match the filter
 * @example
 * getLoans({ page: 1, limit: 10 }) // returns { loans: Loan[], page: 1, limit: 10, results: 10 }
 */
export async function getLoans(filter: LoanFilter = {}) {
	try {
		await connectDB();

		const page = filter.page ?? 1;
		const limit = filter.limit ?? 10;
		const skip = (page - 1) * limit;

		const loans = await Loan.find().skip(skip).limit(limit).lean().exec();

		const results = loans.length;

		return {
			loans: loans,
			page,
			limit,
			results,
		};
	} catch (error) {
		return { error };
	}
}

export async function createLoan(params: Loan) {
	try {
		await connectDB();

		const loan = await Loan.create(params);

		return {
			loan,
		};
	} catch (error) {
		return { error };
	}
}

export async function getLoan(id: string) {
	try {
		await connectDB();

		const parsedId = stringToObjectId(id);

		if (!parsedId) {
			return { error: 'Loan not found' };
		}

		const loan = await Loan.findById(parsedId).lean().exec();
		if (loan) {
			return {
				loan,
			};
		} else {
			return { error: 'Loan not found' };
		}
	} catch (error) {
		return { error };
	}
}

type UpdateLoanParams = {
	id: string;
	params: Partial<Loan>;
};
export async function updateLoan({ id, params }: UpdateLoanParams) {
	try {
		await connectDB();

		const parsedId = stringToObjectId(id);

		if (!parsedId) {
			return { error: 'Loan not found' };
		}

		const loan = await Loan.findByIdAndUpdate(parsedId, params, { new: true })
			.lean()
			.exec();

		if (loan) {
			return {
				loan,
			};
		} else {
			return { error: 'Loan not found' };
		}
	} catch (error) {
		return { error };
	}
}

export async function deleteLoan(id: string) {
	try {
		await connectDB();

		const parsedId = stringToObjectId(id);

		if (!parsedId) {
			return { error: 'Loan not found' };
		}

		const loan = await Loan.findByIdAndDelete(parsedId).exec();

		if (loan) {
			return {};
		} else {
			return { error: 'Loan not found' };
		}
	} catch (error) {
		return { error };
	}
}
