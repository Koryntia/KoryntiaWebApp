import React, { FC } from 'react';
import Image from 'next/image';
import { Bitcoin, Heart } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export type CardProps = {
	image: string;
	title: string;
	time: string;
	description: {
		by: string;
		collateral: string;
	};
	bid: {
		amount: string;
		currency: string;
	};
	liked: boolean;
	onLike: () => void;
	onRepay: () => void;
};

const LoanCard: FC<CardProps> = ({ image, time, title, description, bid }) => {
	return (
		<Card className={cn('border-none bg-muted/50')}>
			<CardHeader className={cn('p-0')}>
				<CardTitle>
					<Image
						src={image}
						width={1920}
						height={1080}
						alt={title}
						className="aspect-video object-cover rounded-md w-full"
					/>
					<div className="absolute top-3 right-3 gap-1 flex items-center justify-between  text-white">
						<div className="rounded-full py-1 px-2 supports-[backdrop-filter]:bg-white/10 backdrop-blur-lg drop-shadow">
							<p className="text-xs">{time}</p>
						</div>
						<button
							className={cn(
								'rounded-full w-6 h-6  p-1 supports-[backdrop-filter]:bg-background/10 backdrop-blur-lg drop-shadow',
							)}
						>
							<Heart className="w-4 h-4" />
						</button>
					</div>
				</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent>
				<h2 className="scroll-m-20 text-foreground text-xl font-semibold tracking-tight">
					{title}
				</h2>
				<p className="text-sm text-muted-foreground flex items-center gap-4">
					<span>By {description.by}</span>
					<span>Collateral {description.collateral}</span>
				</p>
			</CardContent>
			<CardFooter className={cn('justify-between')}>
				<p className="flex flex-col gap-1">
					<span className="text-xs text-muted-foreground">Your Bid</span>
					<span className="flex gap-1 justify-between items-center">
						<Bitcoin className="w-5 h-5 text-primary" />
						{bid.amount} {bid.currency}
					</span>
				</p>
				<Button>Repay</Button>
			</CardFooter>
		</Card>
	);
};

export default LoanCard;
