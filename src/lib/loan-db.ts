import connectDB from './db'
import { stringToObjectId } from './utils'
import type {
	CreateLoanResponse,
	DeleteLoanResponse,
	GetLoanResponse,
	GetLoansResponse,
	LoanFilter,
	Response,
	UpdateLoanParams,
	UpdateLoanResponse,
} from './types'
import { Loan } from '@/models/loan'
import type { TLoan } from '@/models/loan'

/**
 * We can use this function to get loans from the database
 * We invoke the .lean() method on the query to convert the returned documents to plain JavaScript objects instead of mongoDB documents.
 * @param filter The filter to apply to the query
 * @returns The loans that match the filter
 * @example
 * getLoans({ page: 1, limit: 10 }) // returns { loans: Loan[], page: 1, limit: 10, results: 10 }
 */
export async function getLoans(
	filter: LoanFilter = {},
): Promise<Response<GetLoansResponse>> {
	try {
		await connectDB()

		const page = filter.page ?? 1
		const limit = filter.limit ?? 10
		const skip = (page - 1) * limit

		const loans = await Loan.find().skip(skip).limit(limit).lean().exec()
		const results = loans.length

		const _data = { loans, page, limit, results }

		return { status: 200, success: true, data: _data }
	}
	catch (error) {
		return { status: 500, success: false, error }
	}
}

export async function createLoan(
	params: TLoan,
): Promise<Response<CreateLoanResponse>> {
	try {
		await connectDB()

		const loan = await Loan.create(params)

		return { status: 201, success: true, data: { loan } }
	}
	catch (error) {
		return { status: 500, success: false, error }
	}
}

export async function getLoan(id: string): Promise<Response<GetLoanResponse>> {
	try {
		await connectDB()

		const parsedId = stringToObjectId(id)

		if (!parsedId)
			return { status: 404, success: false, error: 'Loan not found' }

		const loan = await Loan.findById(parsedId).lean().exec()

		if (!loan)
			return { status: 404, success: false, error: 'Loan not found' }

		return { status: 200, success: true, data: { loan } }
	}
	catch (error) {
		return { status: 500, success: false, error }
	}
}

export async function updateLoan({
	id,
	params,
}: UpdateLoanParams): Promise<Response<UpdateLoanResponse>> {
	try {
		await connectDB()

		const parsedId = stringToObjectId(id)

		if (!parsedId)
			return { status: 404, success: false, error: 'Loan not found' }

		const loan = await Loan.findByIdAndUpdate(parsedId, params, { new: true })
			.lean()
			.exec()

		if (!loan)
			return { status: 404, success: false, error: 'Loan not found' }

		return { status: 200, success: true, data: { loan } }
	}
	catch (error) {
		return { status: 500, success: false, error }
	}
}

export async function deleteLoan(
	id: string,
): Promise<Response<DeleteLoanResponse>> {
	try {
		await connectDB()

		const parsedId = stringToObjectId(id)

		if (!parsedId)
			return { status: 404, success: false, error: 'Loan not found' }

		const loan = await Loan.findByIdAndDelete(parsedId).lean().exec()

		if (!loan)
			return { status: 404, success: false, error: 'Loan not found' }

		return { status: 200, success: true, data: { loan } }
	}
	catch (error) {
		return { status: 500, success: false, error }
	}
}
