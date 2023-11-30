import React, { FC } from 'react';

type Props = {
	message?: string;
};

const NoLoansFound: FC<Props> = ({ message = 'No Loans Found 🤔' }) => {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<p className="text-2xl font-bold text-pink-500">{message}</p>
		</div>
	);
};

export default NoLoansFound;
