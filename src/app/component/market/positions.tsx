"use client";
import React from "react";
import Card from "@/app/component/common/Card";
import useElementWidth from "@/hooks/useElementWidth";
import { useRouter } from "next/navigation";
import { Route } from "next";
import { DateTime } from "luxon";
import { ILoanRequest } from "@/interfaces/loan-interface";
// import LiquidationModal from "./LiquidationModal";

export const AvailablePositions = ({ loanData }: { loanData: ILoanRequest[] }) => {
   const router = useRouter();
   // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

   const [sectionWidth, sectionRef] = useElementWidth<HTMLDivElement>();

   const handleButtonClick = (title: string) => router.push(`/market/${title}/details` as Route);

   function calculateCountdown(date: string) {
      const targetDate = DateTime.fromISO(date);
      const now = DateTime.now();
      const diff = targetDate.diff(now, ["days", "hours", "minutes", "seconds"]);
      const countdown = `${Math.floor(diff.days)}d ${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m ${Math.floor(diff.seconds)}s`;
      return countdown;
   }

   return (
      <section
         ref={sectionRef}
         className={`grid grid-cols-1 gap-6 place-items-start pt-8 ${sectionWidth && sectionWidth < 800
            ? "grid-cols-2"
            : sectionWidth && sectionWidth > 1200 && sectionWidth < 1600
               ? "grid-cols-4"
               : sectionWidth && sectionWidth > 1600
                  ? "grid-cols-5"
                  : "grid-cols-3"
            }  `}
      >
         {loanData &&
            loanData.map((item, index) => (
               <Card
                  key={index}
                  title={item.name || "title"}
                  bid={{ amount: item.loanAmount, currency: item.loanToken }}
                  interestRate={item.interestRate}
                  image={"/assets/placeholder/cover.png"}
                  time={calculateCountdown(item.loanRequestPeriod.toString())}
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
