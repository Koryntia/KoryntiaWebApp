"use client";
import { LoanData } from "@/services/api/dashboard";
import { DEFAULT_IMAGE } from "@/utils/image";
import Image from "next/image";
import { FC } from "react";
import { TbCurrencyEthereum } from "react-icons/tb";

interface RecentLoansProps {
   data: LoanData[] | undefined;
}

const RecentLoans: FC<RecentLoansProps> = ({ data }) => {
   return (
      <ul className="w-full h-[310px] pr-[2px] overflow-auto">
         {data &&
            data.map((key, index) => (
               <li
                  key={index}
                  className="flex items-center justify-between py-4 text-gray-900 border-b-2  border-zinc-50 "
               >
                  <div className="flex gap-3">
                     <div>
                        <Image
                           className="w-10 h-10 rounded-full"
                           src={"/assets/placeholder/image.png"}
                           width={15}
                           height={15}
                           alt="Jese image"
                        />
                     </div>
                     <div>
                        <div className="font-semibold tracking-wider font-inter text-base">
                           <span>{key._id}</span>
                           {/* <span>Uzachi #4390</span> */}
                        </div>
                        <div className="font-normal font-inter text-slate-400 text-xs">
                           {/* {key.collateralAmount} */}
                           <span>From Ragnarok Meta</span>
                        </div>
                     </div>
                  </div>
                  <span className="flex items-center text-sm font-inter">
                     <TbCurrencyEthereum className="inline-block w-6 h-6 text-appColor1" />
                     {key.collateralAmount} {key.loanToken}
                  </span>
               </li>
            ))}
      </ul>
   );
};

export default RecentLoans;
