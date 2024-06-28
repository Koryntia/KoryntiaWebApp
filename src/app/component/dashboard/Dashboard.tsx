import React from "react";
import { PositionCards } from "../my-positions";
import Banner from "./banner";
import { positionCardsData } from "@/data";
import ActivePositions from "../common/Tables/active-position-container";
import Link from "next/link";

const Dashboard = () => {
   const firstThreePositionData = positionCardsData.slice(0, 3);

   return (
      <div className="">
         <div className="dashboard-banner">
            <Banner />
         </div>
         <div className="dashboard-market-posistion">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-black222 text-[24px] not-italic leading-[31.2px] font-semibold">Market Position</h2>
               <Link href={"/mypositions"}>
                  <p className="text-appColor1 text-[14px] tracking-[0.14px] leading-[18.2px] not-italic font-medium cursor-pointer">
                     View All
                  </p>
               </Link>
            </div>
            <div className="flex">
               <PositionCards positionCardsData={firstThreePositionData} isDashBoard />
            </div>
         </div>
         <div className="dashboard-user-active-position">
            <ActivePositions />
         </div>
      </div>
   );
};

export default Dashboard;
