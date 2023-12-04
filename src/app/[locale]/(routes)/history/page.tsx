import type { FC } from 'react'
import ActivePositions from '@/app/component/common/Tables/active-position-container'
import RecentPositionsList from '@/app/component/common/Tables/recent-loans-container'

interface pageProps {

}

const page: FC<pageProps> = () => {
	return (
		<>
			<ActivePositions />
			<RecentPositionsList />
		</>
	)
}

export default page
