import { FC } from 'react';
import PageTitle from '@/app/component/common/page-title';
import { Filters } from './_filters';
import { DataTable } from './_data-table';

interface pageProps {}

const page: FC<pageProps> = () => {
	return (
		<section className="my-4 xl:my-8 space-y-4 lg:space-y-8">
			<PageTitle title="Available Positions" />
			<Filters />
			<DataTable />
		</section>
	);
};

export default page;
