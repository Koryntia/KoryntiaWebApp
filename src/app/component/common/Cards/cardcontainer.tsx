'use client'
import type { FC } from 'react'
import Card from './card'
import positionsInfo from '@/app/data/carddata'
import './card.css'

const Cardcontainer: FC = () => {
	const cardData = positionsInfo
	return (
		<div className="flex items-center ">
			<Card data={cardData}></Card>
		</div>
	)
}

export default Cardcontainer
