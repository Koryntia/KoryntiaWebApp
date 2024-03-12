"use client";
import React, { useEffect, useState } from "react";
import Card, { CardProps } from "@/app/component/common/Card";
import useAuth from "@/hooks/useAuth";
import { LoanData, getMyLoan } from "@/services/api/my-position";
import useElementWidth from "@/hooks/useElementWidth";
import LiquidationModal from "./LiquidationModal";

interface PositionCardsProps {
  positionCardsData: CardProps[];
}

export const LliquidationCards = ({
  positionCardsData,
}: PositionCardsProps) => {
  const { address, logout, addressBalance } = useAuth();
  const [loanData, setLoanData] = useState<LoanData[]>();
  const [sectionWidth, sectionRef] = useElementWidth<HTMLDivElement>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleGetMyLoanAPI = () => {
    if (!address) return;
    getMyLoan(address).then((data) => setLoanData(data));
  };

  useEffect(() => handleGetMyLoanAPI(), []);

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
      {positionCardsData &&
        positionCardsData.map((item, index) => (
          <Card
            key={index}
            title={"Dayco Serpentine Belt"}
            bid={{
              amount: "180",
              currency: "KAR",
            }}
            description={{ by: "12%", collateral: "110%" }}
            image={"/assets/placeholder/cover.png"}
            time="2h 4m 32s"
            isLliquidation={true}
            onButtonClick={() => setIsModalOpen(true)}
          />
        ))}
      <LiquidationModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
