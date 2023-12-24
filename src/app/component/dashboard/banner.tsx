import React from "react";

const Banner = () => {
  return (
    <div className="w-740 mb-6 lg:h-[250px] flex flex-col justify-center p-4 flex-shrink-0 rounded-2xl bg-gradient-to-r from-purple-700 to-purple-200">
      <div className="">
        <h1 className="text-whiteFFF text-[32px] font-semibold not-italic leading-[41.6px] tracking-[0.32px] ">
          Join the Future of Crypto Investments
        </h1>
        <p className="text-whiteFFF mb-6 mt-4 text-[14px] not-italic font-medium leading-[18.2px] tracking-[0.14px] opacity-70">
          Earn with your crypto and take control of your finances.
        </p>
      </div>
      <div className="flex gap-5">
        <button
          className="flex py-[13px] px-[17px] bg-whiteFFF items-center justify-center rounded-[8px]
        text-appColor1 text-[14px] not-italic font-semibold leading-[18.2px] tracking-[0.14px]
        "
        >
          Explore Market
        </button>
        <button
          className="flex py-[13px] border border-whiteFFF px-[17px] bg-transparent items-center justify-center rounded-[8px]
        text-whiteFFF text-[14px] not-italic font-semibold leading-[18.2px] tracking-[0.14px]
        "
        >
          Create New Position
        </button>
      </div>
    </div>
  );
};

export default Banner;
