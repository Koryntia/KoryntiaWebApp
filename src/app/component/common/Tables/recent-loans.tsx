'use client'
import Image from 'next/image'
import type { FC } from 'react'
import { TbCurrencyEthereum } from 'react-icons/tb'

interface RecentLoansProps {
	data: any
}

const RecentLoans: FC<RecentLoansProps> = ({ data }) => {
	const keys = Object.values(data)
	return (
		<ul className="w-80">
			{keys.map((key: any, index) => (
				<li
					key={index}
					className="flex items-center px-6 py-4 text-gray-900 border-b-2  border-zinc-50 "
				>
					<Image
						className="w-10 h-10 rounded-full"
						src="https://random.imagecdn.app/500/15"
						width={10}
						height={10}
						alt="Jese image"
					/>
					<div className="pl-4 w-40">
						<div className="text-base font-extrabold ">{key.title}</div>
						<div className="font-semibold text-slate-400 text-sm">
							{key.creator}
						</div>
					</div>
					<span>
						<TbCurrencyEthereum className="inline-block  text-appColor1" />
						{key.amount}
					</span>
				</li>
			))}
		</ul>
	)
}

export default RecentLoans
