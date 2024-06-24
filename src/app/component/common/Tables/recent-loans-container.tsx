"use client";
import { FC, useEffect, useState } from "react";
import RecentLoans from "./recent-loans";
import { useTranslations } from "next-intl";
import { LoanData, getRecentLoan } from "@/services/api/dashboard";
import { useAccount } from "wagmi";

const RecentPositionsList: FC = () => {
   const t = useTranslations("RecentLoans");
   const [active, setActive] = useState(true);
   const [recentLoan, setRecentLoan] = useState<LoanData[]>();
   const { address } = useAccount();

   const handleClick = () => {
      if (active) {
         setActive(false);
      } else {
         setActive(true);
      }
   };
   const tableButtonInfo: string = active ? "View All" : "View Less";

   const _getRecentLoadAPI = (address: String) => {
      getRecentLoan(address)
         .then((res) => {
            if (res) {
               setRecentLoan(active ? res?.slice(0, 3) : res);
            }
         })
         .catch((er) => console.error(er));
   };

   useEffect(() => {
      if (!address) return;
      _getRecentLoadAPI(address);
   }, [active]);

   return (
      <div className="">
         <div className="flex justify-between w-full">
            <h3 className="text-textBlack text-lg font-semibold font-raleway leading-[23.4px]">{t("title")}</h3>
            <button className="text-appColor1 font-bold" onClick={handleClick}>
               {tableButtonInfo}
            </button>
         </div>
         <RecentLoans data={recentLoan} />
      </div>
   );
};

export default RecentPositionsList;
