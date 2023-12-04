'use client'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { useAccount } from 'wagmi'
import { userAccountTypes } from '../action-types/user-account-types'

export const getUserAccount = createAsyncThunk(
	userAccountTypes.getUserAccount,
	async () => {
		// const response = await axiosInstance.get('/api/v1/')
		const { address, connector, isConnecting, isReconnecting, isConnected, isDisconnected, status } = useAccount()
		return {
			address,
			connector,
			isConnecting,
			isReconnecting,
			isConnected,
			isDisconnected,
			status,
		}
	},
)
