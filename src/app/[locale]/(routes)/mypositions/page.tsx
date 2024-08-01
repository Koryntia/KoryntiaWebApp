"use client";
import { FC } from "react";
import PageTitle from "@/app/component/common/page-title";
import { PositionTabs, PositionCards } from "@/app/component/my-positions";
import { positionCardsData } from "@/data";

interface pageProps { }

const page: FC<pageProps> = () => {
  return (
    <section className="space-y-4 lg:space-y-8 w-full h-full p-8">
      <PageTitle title="My Positions" />
      <PositionTabs />
      <PositionCards
        suppliedLoans={false}
        gridStyle="lg:grid-cols-4"
        description="No Positions"
      />
      <PageTitle title="Supplied" />
      <PositionCards
        suppliedLoans={true}
        gridStyle="lg:grid-cols-4"
        description="No Positions"
      />
    </section>
  );
};

export default page;
