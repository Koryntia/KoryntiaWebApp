"use client";
import React, { useEffect, useState } from "react";
import Card, { CardProps } from "@/app/component/common/Card";
import useAuth from "@/hooks/useAuth";
import useElementWidth from "@/hooks/useElementWidth";
import { useRouter } from "next/navigation";
import { Route } from "next";
import { DateTime } from "luxon";
import { getMarketLoans } from "@/services/api/market-loans";
import { ILoanRequest } from "@/interfaces/loan-interface";
// import LiquidationModal from "./LiquidationModal";

interface PositionCardsProps {
   positionCardsData: CardProps[];
}

export const AvailablePositions = ({ positionCardsData }: PositionCardsProps) => {
   const router = useRouter();
   const routePath = 254;

   const { address, logout, addressBalance } = useAuth();
   const [loanData, setLoanData] = useState<ILoanRequest[]>();
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState(false);

   const [sectionWidth, sectionRef] = useElementWidth<HTMLDivElement>();

   const handleGetMarketLoans = () => {
      setIsLoading(true);
      getMarketLoans()
         .then((data) => setLoanData(data))
         .finally(() => setIsLoading(false));
   };

   useEffect(() => handleGetMarketLoans(), []);

   const handleButtonClick = () => router.push(`/market/${routePath}/details` as Route);

   if (isLoading) return <div>Loading...</div>;

   function calculateCountdown(date: string) {
      const targetDate = DateTime.fromISO(date);
      const now = DateTime.now();
      const diff = targetDate.diff(now, ["hours", "minutes", "seconds"]);

      const countdown = `${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m ${Math.floor(diff.seconds)}s`;
      return countdown;
   }
   return (
      <section
         ref={sectionRef}
         className={`grid grid-cols-1 gap-6 place-items-start pt-8 ${
            sectionWidth && sectionWidth < 800
               ? "grid-cols-2"
               : sectionWidth && sectionWidth > 1200 && sectionWidth < 1600
               ? "grid-cols-4"
               : sectionWidth && sectionWidth > 1600
               ? "grid-cols-5"
               : "grid-cols-3"
         }  `}
      >
         {/* {positionCardsData &&
        positionCardsData.map((item, index) => (
          <Card
            key={index}
            title={item.description.by}
            bid={{
              amount: "180",
              currency: "KAR",
            }}
            description={{ by: "12%", collateral: "110%" }}
            image={"/assets/placeholder/cover.png"}
            time="2h 4m 32s"
            onButtonClick={handleButtonClick}
          />
        ))} */}
         {loanData &&
            loanData.map((item, index) => (
               <Card
                  key={index}
                  title={item.name || "title"}
                  bid={{ amount: item.loanAmount, currency: item.loanToken }}
                  description={{ by: "static", collateral: item.collateralAmount + "%" }}
                  image={"/assets/placeholder/cover.png"}
                  time={calculateCountdown(item.loanPeriod.toString())}
                  onButtonClick={handleButtonClick}
               />
            ))}
         {/* <LiquidationModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      /> */}
      </section>
   );
};
