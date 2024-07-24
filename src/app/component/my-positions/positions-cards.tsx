import React, { useEffect, useState } from "react";
import Card, { CardProps } from "./_components/card";
import useAuth from "@/hooks/useAuth";
import { LoanData, getMyLoan } from "@/services/api/my-position";
import { positionCardsData } from "@/data";
import Slider from "react-slick";
import useElementWidth from "@/hooks/useElementWidth";
import { DateTime, Duration } from "luxon";
import { getMarketLoans } from "@/services/api/market-loans";
import { ILoanRequest } from "@/interfaces/loan-interface";

interface PositionCardsProps {
   positionCardsData: CardProps[];
   gridStyle?: string;
   isDashBoard?: boolean;
}

export const PositionCards = ({ isDashBoard }: PositionCardsProps) => {
   const [sectionWidth, sectionRef] = useElementWidth<HTMLDivElement>();
   const [slidesToShow, setSlidesToShow] = useState<number>(3);

   useEffect(() => {
      if (sectionWidth) {
         if (sectionWidth > 1800) {
            setSlidesToShow(5);
         } else if (sectionWidth < 768 && sectionWidth > 350) {
            setSlidesToShow(2);
         } else if (sectionWidth > 1200 && sectionWidth <= 1800) {
            setSlidesToShow(4);
         } else if (sectionWidth > 768 && sectionWidth <= 1200) {
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

   const { address, logout, addressBalance } = useAuth();
   const [loanData, setLoanData] = useState<ILoanRequest[]>();
   const [isLoading, setIsLoading] = useState(false);

   const handleGetMyLoanAPI = () => {
      if (!address) return;
      setIsLoading(true);
      getMyLoan(address)
         .then((data) => {
            if (data) {
               setLoanData(data);
            }
         })
         .finally(() => setIsLoading(false));
   };

   const handleGetMarketLoans = () => {
      setIsLoading(true);
      getMarketLoans()
         .then((data) => setLoanData(data?.slice(0, 3)))
         .finally(() => setIsLoading(false));
   };

   useEffect(() => {
      if (isDashBoard) {
         handleGetMarketLoans();
      } else {
         handleGetMyLoanAPI();
      }
   }, []);

   if (isLoading) return <div>Loading...</div>;

   function calculateCountdown(date: string) {
      const targetDate = DateTime.fromISO(date);
      const now = DateTime.now();
      const diff = targetDate.diff(now, ["hours", "minutes", "seconds"]);

      const countdown = `${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m ${Math.floor(diff.seconds)}s`;
      return countdown;
   }

   return (
      <div className="w-full aspect-square h-[300px] " ref={sectionRef}>
         <Slider {...settings}>
            {/* {positionCardsData &&
               positionCardsData.map((item, index) => (
                  <div key={index} className="max-w-xs px-2 rounded-[15px] shadow">
                     <Card
                        title={item.title}
                        bid={item.bid}
                        description={item.description}
                        image={item.image}
                        time={item.time}
                     />
                  </div>
               ))} */}
            {loanData &&
               loanData.map((item, index) => (
                  <div key={index} className="max-w-xs px-2 rounded-[15px] shadow">
                     <Card
                        title={item.name || "Title"}
                        bid={{ amount: item.loanAmount, currency: item.loanToken }}
                        description={{ by: "Static", collateral: item.collateralAmount + "%" }}
                        image={positionCardsData[0].image}
                        time={calculateCountdown(item.loanPeriod.toString())}
                     />
                  </div>
               ))}
         </Slider>
      </div>
   );
};
