"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import etheriumIcon from "../../../../public/icons/etherium.svg";
import useElementWidth from "@/hooks/useElementWidth";
import Card from "../common/Card";
import { useEffect, useState } from "react";
import MarketModal from "./marketModal";
import Slider from "react-slick";
import { calculateSlidesToShow } from "@/utils/helper";
import Timer from "../common/Timer";
import { Route } from "next";
import { ILoanRequest } from "@/interfaces/loan-interface";
import { DateTime } from "luxon";
import EmptyComponent from "../common/Empty";

export const MarketPositionDetail = ({ loanData, marketLoans }: { loanData: ILoanRequest | null, marketLoans: ILoanRequest[] }) => {
  const router = useRouter();
  const [isPositionName, setIsPositionName] = useState(false);
  const [sectionWidth, sectionRef] = useElementWidth<HTMLDivElement>();
  const [slidesToShow, setSlidesToShow] = useState<number>(3);
  console.log(marketLoans)

  function calculateCountdown(date: string) {
    const targetDate = DateTime.fromISO(date);
    const now = DateTime.now();
    const diff = targetDate.diff(now, ["days", "hours", "minutes", "seconds"]);
    const countdown = `${Math.floor(diff.days)}d ${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m ${Math.floor(diff.seconds)}s`;
    return countdown;
  }

  const currentDate = new Date();
  const endDate = new Date(loanData ? loanData.loanRequestPeriod : currentDate);
  endDate.setDate(endDate.getDate() + 1);

  useEffect(() => {
    if (sectionWidth) {
      const slides = calculateSlidesToShow(sectionWidth);
      setSlidesToShow(slides);
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

  return (
    <section className="p-8">
      <div className="direction  ">
        <button className="bg-gray-100 rounded-md py-1 px-4">
          <span
            onClick={() => router.push("/market")}
            className="text-textGray font-medium text-[14px] font-inter"
          >{`Marketplace > `}</span>
          <span className="text-appColor1 font-medium font-inter text-[14px]">
            {"Open Bid"}
          </span>
        </button>
      </div>
      {
        loanData ?
          <div className="flex flex-col lg:flex-row gap-8 mt-4 ">
            <div className="flex-1">
              <Image
                src={
                  "/koryntia-logo.png"
                }
                height={100}
                width={100}
                alt="market-position details"
                className="w-full h-full rounded-2xl"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-[28px] text-black222 font-semibold leading-[36.4px] not-italic ">
                </h2>
                <p className="text-textGray text-base leading-[180%] tracking-[0.14px]">{`The borrower is seeking a loan of ${loanData.loanAmount} ${loanData.loanToken}, showcasing a ${loanData.interestRate}% interest rate while leveraging a robust ${loanData.liquidationThreshold}% collateralization ratio. This demonstrates the borrower's intention to secure the loan by offering a substantial collateral base of ${Number(loanData.collateralAmount).toFixed(4)} ${loanData.collateralToken}, ensuring a lower risk profile within the lending ecosystem.`}</p>
                <div>
                  <hr className="my-4" />
                  <div className="flex flex-col lg:flex-row lg:justify-between">
                    <div>
                      <p className="text-textGray text-[16px] leading-[20.8px] tracking-[0.16px] not-italic ">
                        Auction End In
                      </p>
                      <div className="pt-3">
                        <Timer endTime={endDate} />
                      </div>
                    </div>
                    <div>
                      <p className="text-textGray text-[16px] leading-[20.8px] tracking-[0.16px] not-italic">
                        Required Amount
                      </p>
                      <div className="flex items-center pt-3">
                        <Image
                          src={etheriumIcon}
                          height={100}
                          width={100}
                          className="h-5 w-5"
                          alt="etherium icon"
                        />
                        <p className="text-[16px] not-italic font-semibold leading-[26px] tracking-[0.2px]">
                          {loanData.loanAmount} {loanData.loanToken}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-textGray text-[16px] leading-[20.8px] tracking-[0.16px] not-italic">
                        APR
                      </p>
                      <div>
                        <p className="text-[16px] not-italic font-semibold leading-[26px] tracking-[0.2px] pt-3">
                          {loanData.interestRate}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <p className="opacity-90 text-neutral-400 text-base font-medium font-inter leading-tight tracking-tight">
                      Health factor
                    </p>
                    <button className="bg-textGreen1 my-4 rounded-2xl py-[3px] px-6 text-whiteFFF  text-[12px]">
                      {loanData.healthFactor}% High
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="bg-appColor1 px-4 py-3  rounded-md text-whiteFFF w-[210px]"
                onClick={() => setIsPositionName(true)}
              >
                Supply
              </button>
            </div>
          </div> :
          <EmptyComponent description="loan details not found" />
      }

      <div className="pt-[40px]">
        <span className="text-neutral-800 text-2xl font-semibold font-raleway leading-[31.20px] pb-[30px]">
          Other loans
        </span>
        <div
          className="w-full aspect-square h-[300px] pt-[30px]"
          ref={sectionRef}
        >
          <Slider {...settings}>
            {marketLoans.map((item, index) => (
              <div
                key={index}
                className="max-w-xs px-2 rounded-[15px] shadow"
              >
                <Card
                  title={item.name}
                  bid={{ amount: item.loanAmount, currency: item.loanToken }}
                  interestRate={item.interestRate}
                  image={"/koryntia-logo.png"}
                  time={calculateCountdown(item.loanRequestPeriod.toString())}
                  onButtonClick={() => setIsPositionName(true)}
                  onCardClick={() =>
                    router.push(`/market/${item.name}/details` as Route)
                  }
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {loanData && <MarketModal
        open={isPositionName}
        loanData={loanData}
        handleClose={() => setIsPositionName(false)}
      />}
    </section>
  );
};
