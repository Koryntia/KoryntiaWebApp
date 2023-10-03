// "use client";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import "./globals.css";
import { ReactNode } from "react";

import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import LoadingWrapper from "../component/common/loading-wrapper";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children, params: { locale }
}: Props) {

  let messages;

  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="">
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
          </div>
        </NextIntlClientProvider>
      </body>
      {/* <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="">
            {loading ? (
              <Loader />
            ) : (
              <div className="flex h-screen overflow-hidden">
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                  <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                  <main>
                    <div className="mx-auto w-full px-4 py-4 md:px-6 2xl:px-11">
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            )}
          </div>
        </NextIntlClientProvider>
      </body> */}
    </html>
  );
}

