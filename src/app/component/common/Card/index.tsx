"use client";
import Image from "next/image";
import { useAccount } from 'wagmi';
import { AiOutlineHeart } from "react-icons/ai";
import { TbCurrencyEthereum } from "react-icons/tb";
import Button from "../../elements/button/Button";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";

export type CardProps = {
  image: string;
  title: string;
  time: string;
  // description: {
  //   by: string;
  //   collateral: string;
  // };
  interestRate: string,
  bid: {
    amount: string | number;
    currency: string;
  };
  liked?: boolean;
  buttonText?: string;
  status?: string;
  isCurrentBid?: boolean;
  onButtonClick?: (title: string) => void;
  isLliquidation?: boolean;
  onCardClick?: (title: string) => void;
  userDetails: {
    borrower: string;
    investor: string;
 };
};

const Card = ({
  image,
  time,
  title,
  interestRate,
  bid,
  liked,
  status= "requested",
  buttonText,
  isCurrentBid,
  onButtonClick,
  onCardClick,
  userDetails,
}: CardProps) => {
  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onButtonClick && onButtonClick(title);
  };
  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onCardClick && onCardClick(title);
  };  
  const { address } = useAccount();
  const router = useRouter();

  return (
    <article
      className="bg-gray-50 rounded-lg cursor-pointer shadow-sm"
      onClick={(event) => handleCardClick(event)}
    >
      <header className="max-w-xs relative">
        <Image
          src={image}
          width={1920}
          height={1000}
          alt={title}
          className="aspect-video h-[140px] object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2 gap-1 flex items-center justify-between  text-white">
          <div className="rounded-full py-1 px-2 supports-[backdrop-filter]:bg-white/10 backdrop-blur-lg drop-shadow">
            <p className="text-xs">{time}</p>
          </div>
          <button
            type="button"
            title="Like"
            className="rounded-full p-1 supports-[backdrop-filter]:bg-white/10 backdrop-blur-lg drop-shadow"
          >
            <AiOutlineHeart />
          </button>
        </div>
      </header>
      <div className="px-2 flex flex-col gap-4 py-3">
        <main className="pt-1">
          <h1 className="scroll-m-20 text-[16px] font-inter font-semibold tracking-tight">
            {title}
          </h1>
          <p className="text-xs font-inter text-gray-500 flex items-center gap-3 leading-[15.6px] tracking-[0.12px] ">
            <span>Interest Rate</span>
            <span>{interestRate}%</span>
          </p>
        </main>
        <footer className="flex items-center justify-between">
          <div>
            <p className="flex flex-col gap-1">
              <span className="text-[10px] font-outfit text-gray-500">
                Amount
              </span>
              <span className="flex font-inter gap-1 justify-between items-center">
                <TbCurrencyEthereum className="w-5 h-5 text-purple-500" />{" "}
                <span className="text-black222 text-sm font-medium font-['Inter'] leading-[18.20px] tracking-tight">
                  {bid.amount} {bid.currency}
                </span>
              </span>
            </p>
          </div>
          <div>
            {status === "requested" && userDetails.borrower !== address && <Button
              styling="text-xs px-6 py-2"
              variant="solid-purple"
              onClick={(event) => handleButtonClick(event)}
              >
              Supply
            </Button>}
            {status === "requested" && userDetails.borrower === address && <Button
              styling="text-xs px-6 py-2"
              variant="solid-purple"
              onClick={(event) => handleButtonClick(event)}
              >
              Withdraw
            </Button>}
            {status === "funded" && userDetails.borrower === address && <Button
              styling="text-xs px-6 py-2"
              variant="solid-purple"
              onClick={(event) => handleButtonClick(event)}
              >
              Repay
            </Button>}
            {(status === "expired" || status === "unhealthy") && userDetails.investor === address && <Button
              styling="text-xs px-6 py-2"
              variant="error"
              onClick={(event) => handleButtonClick(event)}
              >
              Liquidate
            </Button>}
            {status === "unhealthy" && userDetails.borrower === address && <Button
              styling="text-xs px-6 py-2"
              variant="error"
              onClick={() => router.push(`/market/${encodeURIComponent(title)}/details`)}
            >
              Add Collateral
            </Button>}
          </div>
        </footer>
      </div>
    </article>
  );
};

export default Card;
