"use client";
import React, { useEffect, useState } from "react";
import Card, { CardProps } from "@/app/component/common/Card";
import useAuth from "@/hooks/useAuth";
import { LoanData, getMyLoan } from "@/services/api/my-position";
import LiquidationModal from "./LiquidationModal";
import { getLiquidationLoans } from "@/services/api/liquidation-loans";
import { ILoanRequest } from "@/interfaces/loan-interface";
import { DateTime } from "luxon";

interface PositionCardsProps {
   positionCardsData: CardProps[];
}

export const LliquidationCards = ({ positionCardsData }: PositionCardsProps) => {
   const { address, logout, addressBalance } = useAuth();
   const [loanData, setLoanData] = useState<ILoanRequest[]>();
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState(false);

   const handleGetLiquidationLoans = () => {
      setIsLoading(true);
      getLiquidationLoans()
         .then((data) => setLoanData(data))
         .finally(() => setIsLoading(false));
   };

   useEffect(() => handleGetLiquidationLoans(), []);

   function calculateCountdown(date: string) {
      const targetDate = DateTime.fromISO(date);
      const now = DateTime.now();
      const diff = targetDate.diff(now, ["hours", "minutes", "seconds"]);

      const countdown = `${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m ${Math.floor(diff.seconds)}s`;
      return countdown;
   }

   return (
      <section
         className={`grid grid-cols-1 gap-6 place-items-start pt-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 `}
      >
         {isLoading && <p>Loading...</p>}
         {loanData &&
            loanData.map((item, index) => (
               <>
                  <Card
                     key={index}
                     title={item.name || "title"}
                     bid={{
                        amount: item.loanAmount,
                        currency: item.loanToken,
                     }}
                     description={{ by: "12%", collateral: item.collateralAmount + "%" }}
                     image={"/assets/placeholder/cover.png"}
                     time={calculateCountdown(item.loanPeriod.toString())}
                     isLliquidation={true}
                     onButtonClick={() => setIsModalOpen(true)}
                  />
                  <LiquidationModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} data={item} />
               </>
            ))}
      </section>
   );
};
