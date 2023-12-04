'use client'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import ActivePositionsTable from './active-positions-table'
import positionsInfo from '@/app/data/carddata'

const ActivePositions: FC = () => {
	const t = useTranslations('ActivePositions')
	const [active, setActive] = useState(true)
	const activePositionsTableData = active ? positionsInfo.slice(0, 2) : positionsInfo
	const handleClick = () => {
		if (active)
			setActive(false)

		else
			setActive(true)
	}
	const tableButtonInfo: string = active ? 'View All' : 'View Less'

	return (
		<>
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold">{t('title')}</h1>
				<button className="text-appColor1 font-bold" onClick={handleClick}>{tableButtonInfo}</button>
			</div>
			<ActivePositionsTable data={activePositionsTableData} />
		</>

	)
}

export default ActivePositions
