
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/count-slice';
import userAccountSlice from './features/user-account-slice';
import authReducer from './features/auth-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userAccountSlice,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch