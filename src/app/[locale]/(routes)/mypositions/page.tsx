"use client";
import { FC } from "react";
import PageTitle from "@/app/component/common/page-title";
import { PositionTabs, PositionCards } from "@/app/component/my-positions";
import { positionCardsData } from "@/data";

interface pageProps {}

const page: FC<pageProps> = () => {
  return (
    <section className="my-4 xl:my-8 space-y-4 lg:space-y-8">
      <PageTitle title="My Positions" />
      <PositionTabs />
      <PositionCards
        positionCardsData={positionCardsData}
        gridStyle="lg:grid-cols-4"
      />
    </section>
  );
};

export default page;
