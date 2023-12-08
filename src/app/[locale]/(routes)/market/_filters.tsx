import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import {
	LayoutGrid,
	Layers2,
	CircleDollarSign,
	ListFilter,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const tabs = [
	{
		label: 'Category',
		href: '/market/category',
		icon: LayoutGrid,
	},
	{
		label: 'Collection',
		href: '/market/collection',
		icon: Layers2,
	},
	{
		label: 'Price Range',
		href: '/market/price-range',
		icon: CircleDollarSign,
	},
];

export const Filters = () => {
	return (
		<section className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
			<ol className="flex-1 flex flex-wrap gap-4 items-center justify-start">
				{tabs.map((tab) => (
					<li key={tab.label}>
						<Button asChild variant="outline">
							<Link href={tab.href as Route}>
								<tab.icon className="w-4 h-4 mr-2" />
								{tab.label}
							</Link>
						</Button>
					</li>
				))}
			</ol>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button variant="outline">
						<ListFilter className="w-4 h-4 mr-2" />
						Filter & Sort
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Filter & Sort</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Price</DropdownMenuItem>
					<DropdownMenuItem>Date</DropdownMenuItem>
					<DropdownMenuItem>Currency</DropdownMenuItem>
					<DropdownMenuItem>Collateral</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</section>
	);
};
