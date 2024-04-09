"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import etheriumIcon from "../../../../public/icons/etherium.svg";
import { positionCardsData } from "@/data";
import useElementWidth from "@/hooks/useElementWidth";
import Card from "../common/Card";
import { useEffect, useState } from "react";
import MarketModal from "./marketModal";
import Slider from "react-slick";
import { calculateSlidesToShow } from "@/utils/helper";
import Timer from "../common/Timer";
import { Route } from "next";

export const MarketPositionDetail = () => {
  const router = useRouter();
  const [isPositionName, setIsPositionName] = useState(false);
  const [sectionWidth, sectionRef] = useElementWidth<HTMLDivElement>();
  const [slidesToShow, setSlidesToShow] = useState<number>(3);

  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 1);

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
      <div className="flex flex-col lg:flex-row gap-8 mt-4 ">
        <div className="flex-1">
          <Image
            src={
              "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=3404&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              Position Name
            </h2>
            <p className="text-textGray text-base leading-[180%] tracking-[0.14px]">{`The borrower is seeking a loan of [Insert Requested Tokens] tokens, showcasing a [Insert Risk Factor] risk factor while leveraging a robust [Insert Collateralization Ratio] collateralization ratio. This demonstrates the borrower's intention to secure the loan by offering a substantial collateral base, ensuring a lower risk profile within the lending ecosystem.`}</p>
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
                      3,89 ETH
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-textGray text-[16px] leading-[20.8px] tracking-[0.16px] not-italic">
                    APR
                  </p>
                  <div>
                    <p className="text-[16px] not-italic font-semibold leading-[26px] tracking-[0.2px] pt-3">
                      {"8,9 %"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <p className="opacity-90 text-neutral-400 text-base font-medium font-inter leading-tight tracking-tight">
                  Health factor
                </p>
                <button className="bg-textGreen1 my-4 rounded-2xl py-[3px] px-6 text-whiteFFF  text-[12px]">
                  High
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
      </div>

      <div className="pt-[40px]">
        <span className="text-neutral-800 text-2xl font-semibold font-raleway leading-[31.20px] pb-[30px]">
          Anonther loan
        </span>
        <div
          className="w-full aspect-square h-[300px] pt-[30px]"
          ref={sectionRef}
        >
          <Slider {...settings}>
            {positionCardsData &&
              positionCardsData.map((item, index) => (
                <div
                  key={index}
                  className="max-w-xs px-2 rounded-[15px] shadow"
                >
                  <Card
                    title={item.title}
                    bid={item.bid}
                    description={item.description}
                    image={item.image}
                    time={item.time}
                    onButtonClick={() => setIsPositionName(true)}
                    onCardClick={() =>
                      router.push(`/market/895/details` as Route)
                    }
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>

      <MarketModal
        open={isPositionName}
        handleClose={() => setIsPositionName(false)}
      />
    </section>
  );
};
