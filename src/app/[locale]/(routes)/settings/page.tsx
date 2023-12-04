'use client'
import type { FC } from 'react'
import { useTranslations } from 'next-intl'

interface pageProps {}

const Page: FC<pageProps> = () => {
	const t = useTranslations('HelpCenter')
	return (
		<>
			<section>
				<div>{t('title')}</div>
			</section>
		</>
	)
}

export default Page
