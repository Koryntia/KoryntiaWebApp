'use client';

import React from 'react';
import { PositionCardsData } from '@/data';
import LoanCard from '@/components/shared/loan-card';

export const PositionCards = () => {
	return (
		<section className="grid grid-cols-1 gap-4 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{PositionCardsData.map((item, index) => (
				<LoanCard key={index} {...item} />
			))}
		</section>
	);
};
