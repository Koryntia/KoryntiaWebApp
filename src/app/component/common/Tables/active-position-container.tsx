"use client";
import { useCallback, useEffect, useState } from "react";
import ActivePositionsTable from "./active-positions-table";
import { useTranslations } from "next-intl";
import { getMyLoansByStatus } from "@/services/api/my-position";
import { useAccount } from "wagmi";
import { ILoanRequest, STATUS } from "@/interfaces/loan-interface";
import { Spinner } from "@/app/component/common/Spinner";

const ActivePositions = () => {
  const t = useTranslations("ActivePositions");
  const [loanData, setLoanData] = useState<ILoanRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState<STATUS[]>([
    STATUS.funded,
    STATUS.requested,
    STATUS.unhealthy,
  ]);
  const { address } = useAccount();

  const handleGetMyLoanAPI = useCallback(() => {
    if (!address) return;
    Promise.all(
      selectedStatuses.map((status) => getMyLoansByStatus(address, status))
    ).then((results) => {
      const merged = results.flat();
      setLoanData(merged || []);
    });
  }, [address, selectedStatuses]);

  useEffect(() => {
    handleGetMyLoanAPI();
    setIsLoading(false);
  }, [handleGetMyLoanAPI]);

  const activePositionsTableData = active ? loanData.slice(0, 2) : loanData;
  const tableButtonInfo = active ? "View All" : "View Less";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full m-3">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-between mt-4 w-full">
        <h1 className="text-black222 text-[24px] not-italic leading-[31.2px] font-semibold">
          {t("title")}
        </h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <select
              value={selectedStatuses.join(",")}
              onChange={(e) => {
                const statuses = e.target.value.split(",") as STATUS[];
                setSelectedStatuses(statuses);
              }}
              className="appearance-none bg-white border border-gray-300 text-gray-700 px-4 py-2 pr-8 rounded-md focus:outline-none"
            >
              <option value={STATUS.funded}>Funded</option>
              <option value={STATUS.requested}>Requested</option>
              <option value={STATUS.unhealthy}>Unhealthy</option>
              <option value={STATUS.withdrawn}>Withdrawn</option>
              <option value={STATUS.paid}>Paid</option>
              <option value={STATUS.liquidated}>Liquidated</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <button
            className="bg-appColor1 text-whiteFFF px-4 py-2 rounded-md"
            onClick={() => setActive(!active)}
          >
            {tableButtonInfo}
          </button>
        </div>
      </div>
      <ActivePositionsTable data={activePositionsTableData || []} />
    </>
  );
};

export default ActivePositions;
