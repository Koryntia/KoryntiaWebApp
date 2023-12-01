import type { TLoan, _TLoan } from '@/models/loan';

/**
 * Shared types
 */

// Add more as the use case calls for.
type SuccessStatuses = 200 | 201;
type ErrorStatuses = 403 | 404 | 405 | 409 | 422 | 424 | 429 | 500;

type SuccessState<T> = {
	success: true;
	status: SuccessStatuses;
	data: T;
};

type ErrorState = {
	success: false;
	status: ErrorStatuses;
	error: unknown;
};

export type Response<T> = SuccessState<T> | ErrorState;

/**
 * Loan types
 */
export type LoanFilter = {
	page?: number;
	limit?: number;
};

export type GetLoansResponse = {
	loans: _TLoan[];
	page: number;
	limit: number;
	results: number;
};

export type GetLoanResponse = {
	loan: _TLoan;
};

export type CreateLoanResponse = {
	loan: TLoan;
};

export type UpdateLoanParams = {
	id: string;
	params: Partial<TLoan>;
};

export type UpdateLoanResponse = {
	loan: _TLoan;
};

export type DeleteLoanResponse = {
	loan: _TLoan;
};
