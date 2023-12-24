import "./globals.css";
import { ReactNode } from "react";

import { createTranslator, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import LoadingWrapper from "../component/common/loading-wrapper";
import { ReduxProvider } from "@/redux/provider";
import WagmiProvider from "@/wagmi/WagmiProvider";
import MainContentWrapper from "../component/main-content-wrapper";

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
  return ["en", "de", "es"].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: t("LocaleLayout.title"),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="">
              <WagmiProvider>
                <LoadingWrapper>
                  <MainContentWrapper>{children}</MainContentWrapper>
                </LoadingWrapper>
              </WagmiProvider>
            </div>
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
