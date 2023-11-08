'use client'
import { FC } from "react";
import { useTranslations } from "next-intl";
interface pageProps {
    
}
 
const page: FC<pageProps> = () => {
   const t = useTranslations('HelpCenter');
    return ( <>
    <section>
        <div>{t('title')}</div>
   </section>
    </> );
}
 
export default page;