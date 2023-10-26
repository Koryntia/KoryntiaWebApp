'use client'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loanActionTypes } from '../action-types/loan-action-types';
import axiosInstance from '@/axios/axiosInstance';
import { useAccount } from 'wagmi';
import { userAccountTypes } from '../action-types/user-account-types';

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
            status
        }
    }
);