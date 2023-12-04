'use client'

import React from 'react'
import Card from './_components/card'
import { PositionCardsData } from '@/data'

export function PositionCards() {
	return (
		<section className="grid grid-cols-1 gap-4 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{PositionCardsData.map((item, index) => (
				<Card key={index} {...item} />
			))}
		</section>
	)
}
