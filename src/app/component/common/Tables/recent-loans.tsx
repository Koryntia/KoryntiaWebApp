"use client";
import { Currency, requestAmountOptions } from "@/app/data/currency";
import { LoanData } from "@/services/api/dashboard";
import { truncateAddress } from "@/utils/helper";
import { DEFAULT_IMAGE } from "@/utils/image";
import Image from "next/image";
import { FC } from "react";
import { blo } from "blo";
import { getImage } from "@/shared/constant";


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
                           src={blo(key.userAddress as `0x${string}`)}
                           width={15}
                           height={15}
                           alt="loan creator"
                        />
                     </div>
                     <div>
                        <div className="font-semibold tracking-wider font-inter text-base">
                           <span>{truncateAddress(key.userAddress)}</span>
                           {/* <span>Uzachi #4390</span> */}
                        </div>
                        <div className="font-normal font-inter text-slate-400 text-xs">
                           {/* {key.collateralAmount} */}
                           <span>Koryntia Loans</span>
                        </div>
                     </div>
                  </div>
                  <span className="flex items-center text-sm font-inter">
                     {/* <TbCurrencyEthereum className="inline-block w-6 h-6 text-appColor1" /> */}
                     <Image
                        src={getImage(key.loanToken)}
                        alt="koryntia logo"
                        className=""
                        width={20}
                        height={20}
                     />
                     &nbsp;
                     {key.loanAmount} {key.loanToken}
                  </span>
               </li>
            ))}
      </ul>
   );
};

export default RecentLoans;
