'use client';

import React from 'react';

import LoanCard from '@/components/shared/loan-card';
import { PositionCardsData } from '@/data';

export const DataTable = () => {
	return (
		<section className="grid grid-cols-1 gap-4 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{PositionCardsData.map((item, index) => (
				<LoanCard key={index} {...item} />
			))}
		</section>
	);
};
