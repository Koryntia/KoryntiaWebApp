import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { initialState } from '../states/auth-state'

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        toggleModal(state, action: PayloadAction<boolean>) {
            state.showModal = action.payload;
        },
    },
})

export const { toggleModal } = authSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export default authSlice.reducer