import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { userAccountState } from '../states/wallet/user-account-state'
import { getUserAccount } from '../actions/user-account-action'

export const userAccountSlice = createSlice({
    name: 'user',
    initialState: userAccountState,
    reducers: {
        increment: (state) => {
            //   state.value += 1
        },
        decrement: (state) => {
            //   state.value -= 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserAccount.pending, (state) => {

                state.isConnecting = true;
            })
            .addCase(getUserAccount.fulfilled, (state, action) => {

                console.log("success payload", action.payload);
                
                state.address = action.payload.isDisconnected;
                state.connector = action.payload.isDisconnected;
                state.isConnecting = action.payload.isDisconnected;
                state.isReconnecting = action.payload.isDisconnected;
                state.isConnected = action.payload.isDisconnected;
                state.isDisconnected = action.payload.isDisconnected;
                state.status = action.payload.status;
            })
            .addCase(getUserAccount.rejected, (state, action) => {
                console.log("payload", action.payload);

                // state.loading = false;
                // state.error = false;
                // state.success = false;
                // state.message = action.payload;
            });
    },
})

export const { increment, decrement, } = userAccountSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export default userAccountSlice.reducer