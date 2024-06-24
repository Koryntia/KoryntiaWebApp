"use client";
import React, { useEffect, useState } from "react";
import Card, { CardProps } from "@/app/component/common/Card";
import useAuth from "@/hooks/useAuth";
import { LoanData, getMyLoan } from "@/services/api/my-position";
import useElementWidth from "@/hooks/useElementWidth";
import { useRouter } from "next/navigation";
import { Route } from "next";
import { DateTime } from "luxon";
// import LiquidationModal from "./LiquidationModal";

interface PositionCardsProps {
   positionCardsData: CardProps[];
}

export const AvailablePositions = ({ positionCardsData }: PositionCardsProps) => {
   const router = useRouter();
   const routePath = 254;

   const { address, logout, addressBalance } = useAuth();
   const [loanData, setLoanData] = useState<LoanData[]>();
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

   const [sectionWidth, sectionRef] = useElementWidth<HTMLDivElement>();

   const handleGetMyLoanAPI = () => {
      if (!address) return;
      getMyLoan(address).then((data) => setLoanData(data));
   };

   useEffect(() => handleGetMyLoanAPI(), []);

   const handleButtonClick = () => router.push(`/market/${routePath}/details` as Route);

   if (!loanData) return <div>Loading...</div>;

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
                  title={"title"}
                  bid={{ amount: item.loanAmount, currency: item.loanToken }}
                  description={{ by: "static", collateral: item.collateralAmount + "%" }}
                  image={"/assets/placeholder/cover.png"}
                  time={calculateCountdown(item.loanPeriod)}
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
