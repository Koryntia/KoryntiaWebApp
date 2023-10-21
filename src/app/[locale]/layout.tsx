import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import "./globals.css";
import { ReactNode } from "react";

import { createTranslator, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import LoadingWrapper from "../component/common/loading-wrapper";
import { ReduxProvider } from "@/redux/provider";
import { WagmiConfig } from "wagmi";
import  config  from "../../services/conectwallet/connect-Configuration";


type Props = {
  children: ReactNode;
  params: { locale: string };
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return ['en', 'de', 'es'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: t('LocaleLayout.title')
  };
}

export default async function RootLayout({
  children, params: { locale }
}: Props) {

  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="">
              <WagmiConfig config={config}>
              <LoadingWrapper>
                <div className="flex h-screen overflow-hidden">
                  <Sidebar
                  />
                  <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header
                    />
                    <main>
                      <div className="mx-auto w-full px-4 py-4 md:px-6 2xl:px-11">
                        {children}
                      </div>
                    </main>
                  </div>
                </div>
              </LoadingWrapper>
              </WagmiConfig>
            </div>
          </NextIntlClientProvider>
        </ReduxProvider>

      </body>
    </html>
  );
}

