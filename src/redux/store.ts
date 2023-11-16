
import { configureStore } from '@reduxjs/toolkit';
import  counterReducer  from './features/count-slice';
import userAccountSlice from './features/user-account-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userAccountSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch