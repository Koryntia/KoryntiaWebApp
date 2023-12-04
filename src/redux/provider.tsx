'use client'
import { Provider } from 'react-redux'
import type { ReactNode } from 'react'
import { store } from './store'

export function ReduxProvider({ children }: { children: ReactNode }) {
	return (
		<Provider store={store}>
			{' '}
			{children}
			{' '}
		</Provider>
	)
}
