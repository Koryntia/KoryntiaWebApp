import type { FC } from 'react'
import Login from '@/app/component/login/Login'

interface pageProps {

}

const page: FC<pageProps> = () => {
	return (
		<div>
			<Login />
		</div>
	)
}

export default page
