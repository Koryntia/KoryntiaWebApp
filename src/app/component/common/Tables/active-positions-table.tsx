'use client';
import Image from 'next/image';
import { FC } from 'react';

import { TbCurrencyEthereum } from 'react-icons/tb';

interface TablePorp {
	data: any;
}
const ActivePositionsTable: FC<TablePorp> = ({ data }) => {
	const keys = Object.values(data);
	let growt = {};
	const handleColor = (e: string) => {
		let numberGrowt = parseFloat(e);
		if (numberGrowt > 0) {
			growt = {
				color: 'lime',
			};

			return (
				<span className="font-semibold " style={growt}>
					+{e}%
				</span>
			);
		}
		if (numberGrowt < 0) {
			growt = {
				color: 'red',
			};

			return (
				<span className="font-semibold " style={growt}>
					{e}%
				</span>
			);
		}
		return <span className="font-semibold ">{e}%</span>;
	};
	return (
		<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
			<thead className="text-xs bg-gray-50 text-gray-400">
				<tr>
					<th scope="col" className="px-6 py-3">
						Collection
					</th>
					<th scope="col" className="px-6 py-3">
						Amount
					</th>
					<th scope="col" className="px-6 py-3">
						APR
					</th>
					<th scope="col" className="px-6 py-3">
						Fees
					</th>
					<th scope="col" className="px-6 py-3">
						Supplier
					</th>
					<th scope="col" className="px-6 py-3">
						Installment
					</th>
				</tr>
			</thead>
			<tbody>
				{keys.map((key: any, index) => (
					<tr key={index} className="bg-white border-b-2  border-zinc-50">
						<th
							scope="row"
							className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap text"
						>
							<Image
								className="w-10 h-10 rounded-full"
								src={key.imageId}
								alt="Jese image"
							/>
							<div className="pl-4">
								<div className="text-base font-extrabold">{key.title}</div>
								<div className="font-semibold text-slate-400">
									{key.creator}
								</div>
							</div>
						</th>
						<td className="px-6 py-4 text-black font-semibold">
							<span>
								<TbCurrencyEthereum className="inline-block  text-appColor1" />
								{key.amount}
							</span>
						</td>
						<td className="px-6 py-4">
							<div className="flex items-center">{handleColor(key.Apr)}</div>
						</td>
						<td className="px-6 py-4  text-black font-semibold">
							<span>
								<TbCurrencyEthereum className="inline-block  text-appColor1" />
								{key.fees}
							</span>
						</td>
						<td className="px-6 py-4 text-black font-semibold">
							<span>{key.Supplier}</span>
						</td>
						<td className="px-6 py-4 text-black font-semibold">
							<span>{key.Installment}</span>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default ActivePositionsTable;
