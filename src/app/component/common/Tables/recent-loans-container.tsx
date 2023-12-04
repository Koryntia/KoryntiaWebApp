'use client'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import RecentLoans from './recent-loans'
import positionsInfo from '@/app/data/carddata'

const RecentPositionsList: FC = () => {
	const t = useTranslations('RecentLoans')
	const [active, setActive] = useState(true)
	const TableData = active ? positionsInfo.slice(0, 2) : positionsInfo
	const handleClick = () => {
		if (active)
			setActive(false)

		else
			setActive(true)
	}
	const tableButtonInfo: string = active ? 'View All' : 'View Less'

	return (
		<>
			<div className="flex justify-between w-80">
				<h3 className="text-lg font-bold">{t('title')}</h3>
				<button className="text-appColor1 font-bold" onClick={handleClick}>{tableButtonInfo}</button>
			</div>
			<RecentLoans data={TableData} />
		</>

	)
}

export default RecentPositionsList
