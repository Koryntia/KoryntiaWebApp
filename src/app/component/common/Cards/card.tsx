"use client";
import { useState, useEffect, FC } from "react";
import { DateTime } from "luxon";
import { TbCurrencyEthereum } from "react-icons/tb";
import { calculateTPass } from "@/utils/helper";
import Image from "next/image";

interface CardData {
  data: any;
}

const Card: FC<CardData> = ({ data }) => {
  const keys = Object.values(data);

  const Clock = (time: string) => {
    const creationDate = DateTime.fromFormat(time, "EEE, MMM dd yyyy HH:mm:ss ZZZ");
    const [timePassed, setTimepassed] = useState(calculateTPass(creationDate));

    useEffect(() => {
      const interval = setInterval(() => {
        const elapsed = calculateTPass(creationDate);
        setTimepassed(elapsed);
      }, 1000);
      return () => clearInterval(interval);
    }, [creationDate]);

    return (
      <span className="cardCount mr-2 mb-2">
        {timePassed.hours}h {timePassed.minutes}m {timePassed.seconds}s
      </span>
    );
  };

  return (
    <div className="grid grid-rows-none grid-flow-col overflow-scroll overflow-y-hidden scroll-smooth">
      {keys.map((key: any, index: number) => (
        <div
          key={key.id || index} 
          className="shadow-lg bg-white border-black cardContainer rounded-2xl text-xs inline-block m-4"
        >
          <Image
            className="w-full rounded-xl cardImg"
            src={key.imageId}
            alt={key.title}
            width={400}
            height={300}
          />
          <button className="cardChild">
            <Image
              src="/cards/Duration.svg"
              alt="heart symbol"
              width={20}
              height={20}
            />
          </button>
          {Clock(key.timeOfCreation)}
          <div className="text-gray-400 grid grid-rows-2 grid-cols-4 px-4 gap-10">
            <div className="col-start-1 col-span-3">
              <h3 className="text-slate-900 text-base">{key.title}</h3>
              <span>
                APR {key.Apr}% Collateral {key.collateral}%
              </span>
            </div>
            <div className="col-start-1 col-span-2">
              <h6>current bid</h6>
              <span className="cardBid">
                <TbCurrencyEthereum className="inline-block text-appColor1" />
                {key.bid}ETH
              </span>
            </div>
            <button className="buttonPurple col-start-3 col-span-2 row-start-2">
              supply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
