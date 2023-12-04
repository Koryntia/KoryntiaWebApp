'use server'

import { revalidatePath } from 'next/cache'
import { createLoan, deleteLoan, updateLoan } from '@/lib/loan-db'
import type { TLoan } from '@/models/loan'

/**
 * Server Action: Create a new loan.
 */
export async function createLoanAction({
	path,
	params,
}: {
	path: string
	params: TLoan
}) {
	await createLoan({ ...params })
	revalidatePath(path)
}

/**
 * Server Action: Update an existing loan.
 */
export async function updateLoanAction({
	id,
	params,
	path,
}: {
	id: string
	params: Partial<TLoan>
	path: string
}) {
	await updateLoan({ id, params })
	revalidatePath(path)
}

/**
 * Server Action: Delete a loan.
 */
export async function deleteLoanAction({
	id,
	path,
}: {
	id: string
	path: string
}) {
	await deleteLoan(id)
	revalidatePath(path)
}
