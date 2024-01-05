import React from "react";
import { PositionCards } from "../my-positions";
import Banner from "./banner";
import { positionCardsData } from "@/data";
import ActivePositions from "../common/Tables/active-position-container";

const Dashboard = () => {
  const firstThreePositionData = positionCardsData.slice(0, 3);

  return (
    <div className="lg:mr-10">
      <div className="dashboard-banner">
        <Banner />
      </div>
      <div className="dashboard-market-posistion">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-black222 text-[24px] not-italic leading-[31.2px] font-semibold">
            Market Position
          </h2>
          <p className="text-appColor1 text-[14px] tracking-[0.14px] leading-[18.2px] not-italic font-medium ">
            View All
          </p>
        </div>
        <PositionCards
          positionCardsData={firstThreePositionData}
          gridStyle="lg:grid-cols-3"
        />
      </div>
      <div className="dashboard-user-active-position">
        <ActivePositions />
      </div>
    </div>
  );
};

export default Dashboard;
