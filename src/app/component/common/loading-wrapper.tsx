'use client'

import { useEffect, useState } from 'react'
import Loader from './Loader'

export default function LoadingWrapper({ children }: any) {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => setLoading(false), 500)
	}, [])

	if (loading)
		return <Loader />

	return children
}
