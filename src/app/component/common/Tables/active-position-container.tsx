"use client";
import { useState } from "react";
import positionsInfo from "@/app/data/carddata";
import ActivePositionsTable from "./active-positions-table";
import { useTranslations } from "next-intl";

const ActivePositions = () => {
  const t = useTranslations("ActivePositions");
  const [active, setActive] = useState(true);
  let activePositionsTableData = active
    ? positionsInfo.slice(0, 2)
    : positionsInfo;

  const tableButtonInfo: string = active ? "View All" : "View Less";

  return (
    <>
      <div className="flex justify-between mt-4">
        <h1 className="text-black222 text-[24px] not-italic leading-[31.2px] font-semibold">
          {t("title")}
        </h1>
        <button
          className="text-appColor1 text-[14px] tracking-[0.14px] leading-[18.2px] not-italic font-medium "
          onClick={() => setActive(!active)}
        >
          {tableButtonInfo}
        </button>
      </div>
      <ActivePositionsTable data={activePositionsTableData} />
    </>
  );
};

export default ActivePositions;
