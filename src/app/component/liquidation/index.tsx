"use client";
import React, { useEffect, useState } from "react";
import Card, { CardProps } from "@/app/component/common/Card";
import useAuth from "@/hooks/useAuth";
import { LoanData, getMyLoan } from "@/services/api/my-position";
import LiquidationModal from "./LiquidationModal";

interface PositionCardsProps {
  positionCardsData: CardProps[];
}

export const LliquidationCards = ({
  positionCardsData,
}: PositionCardsProps) => {
  const { address, logout, addressBalance } = useAuth();
  const [loanData, setLoanData] = useState<LoanData[]>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleGetMyLoanAPI = () => {
    if (!address) return;
    getMyLoan(address).then((data) => setLoanData(data));
  };

  useEffect(() => handleGetMyLoanAPI(), []);

  return (
    <section
      className={`grid grid-cols-1 gap-6 place-items-start pt-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 `}
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
