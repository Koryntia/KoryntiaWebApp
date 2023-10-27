import Image from 'next/image';
import React, { FC } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { TbCurrencyEthereum } from 'react-icons/tb';

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
  return (
    <article className="bg-gray-50 space-y-4 p-2 rounded-3xl shadow-sm">
      <header className="max-w-xs relative shadow-sm">
        <Image
          src={image}
          width={1920}
          height={1080}
          alt={title}
          className="aspect-video object-cover rounded-2xl"
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
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-gray-500 flex items-center gap-4">
          <span>By {description.by}</span>
          <span>Collateral {description.collateral}</span>
        </p>
      </main>
      <footer className="flex items-center justify-between">
        <p className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">Your Bid</span>
          <span className="flex gap-1 justify-between items-center">
            <TbCurrencyEthereum className="w-5 h-5 text-purple-500" />{' '}
            {bid.amount} {bid.currency}
          </span>
        </p>
        <button
          onClick={onRepay}
          type="button"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-neutral-200 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-6 py-2 gap-2 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white"
        >
          Repay
        </button>
      </footer>
    </article>
  );
};

export default Card;
