import React from "react";

const Banner = () => {
  return (
    <div className="relative mb-6 lg:h-[250px] flex flex-col justify-center p-4 flex-shrink-0 rounded-2xl bg-gradient-to-r from-purple-500/50 to-purple-900/50">
      <img
        src="/assets/placeholder/dashboard-cover.png"
        className="absolute -z-10 top-0 right-0 opacity-75 w-full h-full object-cover rounded-2xl"
        alt="bg"
      />
      <div className="">
        <h1 className="text-whiteFFF text-[32px] font-semibold not-italic leading-[41.6px] tracking-[0.32px] ">
          Join the Future of Crypto Investments
        </h1>
        <p className="text-whiteFFF mb-6 mt-4 text-[14px] not-italic font-medium leading-[18.2px] tracking-[0.14px] opacity-70">
          Earn with your crypto and take control of your finances.
        </p>
      </div>
      <div className="flex gap-5 ">
        <button
          className="flex py-[13px] px-[17px] hover:scale-95 transition ease-out  bg-whiteFFF items-center justify-center rounded-[8px]
        text-appColor1 text-[14px] not-italic font-semibold leading-[18.2px] tracking-[0.14px]
        "
        >
          Explore Market
        </button>
        <button
          className="flex py-[13px] border hover:text-appColor1 hover:bg-whiteFFF border-whiteFFF px-[17px] bg-transparent items-center justify-center rounded-[8px]
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
