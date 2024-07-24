"use client";
import { useCallback, useEffect, useState } from "react";
import ActivePositionsTable from "./active-positions-table";
import { useTranslations } from "next-intl";
import { getMyLoansByStatus, getMySuppliedLoan } from "@/services/api/my-position";
import { useAccount } from "wagmi";
import { ILoanRequest, STATUS } from "@/interfaces/loan-interface";

const ActivePositions = () => {
   const t = useTranslations("ActivePositions");
   const [loanData, setLoanData] = useState<ILoanRequest[]>();
   const [active, setActive] = useState(true);
   const { address } = useAccount();

   const handleGetMyLoanAPI = useCallback(() => {
      if (!address) return;
      getMyLoansByStatus(address, STATUS.SUPPLIED).then((data) => setLoanData(data));
   }, [address]);

   useEffect(() => handleGetMyLoanAPI(), [handleGetMyLoanAPI]);

   let activePositionsTableData = active ? loanData?.slice(0, 2) : loanData;

   const tableButtonInfo: string = active ? "View All" : "View Less";

   return (
      <>
         <div className="flex justify-between mt-4">
            <h1 className="text-black222 text-[24px] not-italic leading-[31.2px] font-semibold">{t("title")}</h1>
            <button
               className="text-appColor1 text-[14px] tracking-[0.14px] leading-[18.2px] not-italic font-medium "
               onClick={() => setActive(!active)}
            >
               {tableButtonInfo}
            </button>
         </div>
         <ActivePositionsTable data={activePositionsTableData || []} />
      </>
   );
};

export default ActivePositions;
