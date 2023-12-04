import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { initialState } from '../states/count-state'

// import { getUserLoan } from '../actions/loan-action'

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1
		},
		decrement: (state) => {
			state.value -= 1
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload
		},
	},
//   extraReducers: (builder) => {
//     builder
//         .addCase(getUserLoan.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(getUserLoan.fulfilled, (state, action) => {
//             state.loading = false;
//             state.error = false;
//             state.success = true;
//         })
//         .addCase(getUserLoan.rejected, (state, action) => {
//             state.loading = false;
//             state.error = false;
//             state.success = false;
//             state.message = action.payload;
//         });
// },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer
