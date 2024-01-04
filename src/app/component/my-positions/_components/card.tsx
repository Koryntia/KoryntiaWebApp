"use client";
import Image from "next/image";
import React, { FC } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { TbCurrencyEthereum } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type CardProps = {
  image: string;
  title: string;
  time: string;
  description: {
    by: string;
    collateral: string;
  };
  bid: {
    amount: string;
    currency: string;
  };
  liked: boolean;
  onLike: () => void;
  onRepay: () => void;
};

const Card: FC<CardProps> = ({
  image,
  time,
  title,
  description,
  bid,
  liked,
  onLike,
  onRepay,
}) => {
  const router = useRouter();

  return (
    <Link
      href={{
        pathname: `/market/${title}/details`,
        query: {},
      }}
    >
      <article className="bg-gray-50 space-y-4 p-2 rounded-3xl cursor-pointer shadow-sm">
        <header className="max-w-xs relative shadow-sm">
          <Image
            src={image}
            width={1920}
            height={900}
            alt={title}
            className="aspect-video h-[120px] object-cover rounded-2xl"
          />
          <div className="absolute top-3 right-3 gap-1 flex items-center justify-between  text-white">
            <div className="rounded-full py-1 px-2 supports-[backdrop-filter]:bg-white/10 backdrop-blur-lg drop-shadow">
              <p className="text-xs">{time}</p>
            </div>
            <button
              type="button"
              title="Like"
              className="rounded-full p-1 supports-[backdrop-filter]:bg-white/10 backdrop-blur-lg drop-shadow"
              onClick={onLike}
            >
              <AiOutlineHeart />
            </button>
          </div>
        </header>
        <main>
          <h1 className="scroll-m-20 text-[16px] font-semibold tracking-tight">
            {title}
          </h1>
          <p className="text-[12px] text-gray-500 flex items-center gap-4 leading-[15.6px] tracking-[0.12px] ">
            <span>By {description.by}</span>
            <span>Collateral {description.collateral}</span>
          </p>
        </main>
        <footer className="flex items-center justify-between">
          <p className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">Your Bid</span>
            <span className="flex gap-1 justify-between items-center">
              <TbCurrencyEthereum className="w-5 h-5 text-purple-500" />{" "}
              <span className="text-[14px] text-black222">
                {bid.amount} {bid.currency}
              </span>
            </span>
          </p>
          <button
            onClick={onRepay}
            type="button"
            className="bg-appColor1 text-whiteFFF px-4 py-1 rounded-md"
          >
            Repay
          </button>
        </footer>
      </article>
    </Link>
  );
};

export default Card;
