"use client";
import { FC, useEffect, useState } from "react";
import RecentLoans from "./recent-loans";
import { useTranslations } from "next-intl";
import { LoanData, getRecentLoan } from "@/services/api/dashboard";
import { useAccount } from "wagmi";
import EmptyComponent from "../Empty";
import { Spinner } from "@/app/component/common/Spinner";

const RecentPositionsList: FC = () => {
   const t = useTranslations("RecentLoans");
   const [active, setActive] = useState(true);
   const [recentLoan, setRecentLoan] = useState<LoanData[]>();
   const [isLoading, setIsLoading] = useState(true);
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
               setRecentLoan(res);
            }
         })
         .catch((er) => console.error(er));
   };

   useEffect(() => {
      if (!address) return;
      _getRecentLoadAPI(address);
      setIsLoading(false);
   }, [active, address]);

   const sortedData = recentLoan?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
   const data = active ? sortedData?.slice(0, 3) : sortedData;

   if (isLoading) return (
      <div className="justify-center flex items-center w-full m-3">
         <Spinner />
      </div>
   );

   return (
      <div className="">
         <div className="flex justify-between w-full">
            <h3 className="text-textBlack text-lg font-semibold font-raleway leading-[23.4px]">{t("title")}</h3>
            <button className="text-appColor1 font-bold" onClick={handleClick}>
               {tableButtonInfo}
            </button>
         </div>
         {data && data.length > 0 ? <RecentLoans data={data} /> : <EmptyComponent description="No Loans" />}
      </div>
   );
};

export default RecentPositionsList;
