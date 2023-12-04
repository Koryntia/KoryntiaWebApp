import type { TLoan, _TLoan } from '@/models/loan'

/**
 * Shared types
 */

// Add more as the use case calls for.
type SuccessStatuses = 200 | 201
type ErrorStatuses = 403 | 404 | 405 | 409 | 422 | 424 | 429 | 500

interface SuccessState<T> {
	success: true
	status: SuccessStatuses
	data: T
}

interface ErrorState {
	success: false
	status: ErrorStatuses
	error: unknown
}

export type Response<T> = SuccessState<T> | ErrorState

/**
 * Loan types
 */
export interface LoanFilter {
	page?: number
	limit?: number
}

export interface GetLoansResponse {
	loans: _TLoan[]
	page: number
	limit: number
	results: number
}

export interface GetLoanResponse {
	loan: _TLoan
}

export interface CreateLoanResponse {
	loan: TLoan
}

export interface UpdateLoanParams {
	id: string
	params: Partial<TLoan>
}

export interface UpdateLoanResponse {
	loan: _TLoan
}

export interface DeleteLoanResponse {
	loan: _TLoan
}
