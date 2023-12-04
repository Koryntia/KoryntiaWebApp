import { createAsyncThunk } from '@reduxjs/toolkit'
import { loanActionTypes } from '../action-types/loan-action-types'
import axiosInstance from '@/axios/axiosInstance'

export const getUserLoan = createAsyncThunk(
	loanActionTypes.getloan,
	async () => {
		const response = await axiosInstance.get('/api/v1/')
		return response.data
	},
)
