"use client";
import { FC } from "react";
import PageTitle from "@/app/component/common/page-title";
import { positionCardsData } from "@/data";
import { LliquidationCards } from "@/app/component/liquidation";

interface pageProps {}

const page: FC<pageProps> = () => {
   return (
      <section className="p-8">
         <PageTitle title="Available liquidation" />
         <LliquidationCards positionCardsData={positionCardsData} />
      </section>
   );
};

export default page;
