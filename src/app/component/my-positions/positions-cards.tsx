import React, { useCallback, useEffect, useState } from "react";
import Card from "./_components/card";
import useAuth from "@/hooks/useAuth";
import { positionCardsData } from "@/data";
import Slider from "react-slick";
import useElementWidth from "@/hooks/useElementWidth";
import { DateTime } from "luxon";
import { ILoanRequest } from "@/interfaces/loan-interface";
import { getMyLoan, getMySuppliedLoan } from "@/services/api/my-position";
import EmptyComponent from "../common/Empty";

interface PositionCardsProps {
   gridStyle?: string;
   suppliedLoans?: boolean;
   image?: string;
   description?: string;
   action?: string;
}

export const PositionCards = ({ suppliedLoans, description, image, action }: PositionCardsProps) => {
   const [sectionWidth, sectionRef] = useElementWidth<HTMLDivElement>();
   const [slidesToShow, setSlidesToShow] = useState<number>(3);
   const { address } = useAuth();
   const [loanData, setLoanData] = useState<ILoanRequest[]>();
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (sectionWidth) {
         if (sectionWidth > 1800) {
            setSlidesToShow(5);
         } else if (sectionWidth < 650 && sectionWidth > 450) {
            setSlidesToShow(2);
         } else if (sectionWidth > 1200 && sectionWidth <= 1800) {
            setSlidesToShow(4);
         } else if (sectionWidth > 650 && sectionWidth <= 1200) {
            setSlidesToShow(3);
         } else {
            setSlidesToShow(1);
         }
      }
   }, [sectionWidth]);

   const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: slidesToShow,
      arrows: false,
      slidesToScroll: 1,
   };

   const handleGetMyLoanAPI = useCallback(() => {
      if (!address) {
         return;
      };
      setIsLoading(true);
      getMyLoan(address)
         .then((data) => {
            if (data) {
               setLoanData(data);
            }
         })
         .finally(() => setIsLoading(false));
   }, [address]);


   const handleGetMySuppliedLoansAPI = useCallback(() => {
      if (!address) {
         return;
      };
      setIsLoading(true);
      getMySuppliedLoan(address)
         .then((data) => {
            if (data) {
               setLoanData(data);
            }
         })
         .finally(() => setIsLoading(false));
   }, [address]);

   useEffect(() => {
      if (suppliedLoans) {
         handleGetMySuppliedLoansAPI();
      } else {
         handleGetMyLoanAPI();
      }
   }, [suppliedLoans, handleGetMyLoanAPI, handleGetMySuppliedLoansAPI]);

   if (isLoading) return <div>Loading...</div>;

   function calculateCountdown(date: string) {
      const targetDate = DateTime.fromISO(date);
      const now = DateTime.now();
      const diff = targetDate.diff(now, ["days", "hours", "minutes", "seconds"]);
      const countdown = `${Math.floor(diff.days)}d ${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m ${Math.floor(diff.seconds)}s`;
      return countdown;
   }

   return (
      <div className="w-full aspect-square h-[300px] " ref={sectionRef}>
         <Slider {...settings}>
            {loanData ?
               loanData.map((item, index) => (
                  <div key={index} className="max-w-xs px-2 rounded-[15px] shadow">
                     <Card
                        title={item.name || "Title"}
                        bid={{ amount: item.loanAmount, currency: item.loanToken }}
                        description={{ by: "Static", collateral: item.collateralAmount, collateralToken: item.collateralToken }}
                        image={positionCardsData[0].image}
                        time={calculateCountdown(item.loanPeriod.toString())}
                     />
                  </div>
               ))
               :
               <EmptyComponent image={image} description={description} action={action} />
            }
         </Slider>
      </div>
   );
};
