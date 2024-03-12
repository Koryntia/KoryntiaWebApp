"use client";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { decrement, increment } from "../../redux/features/count-slice";

import { useAccount } from "wagmi";
import Dashboard from "../component/dashboard/Dashboard";
import RecentPositionsList from "../component/common/Tables/recent-loans-container";
import CreateLoan from "../component/create-loan/create-loan";

export default function Home() {
  const { address } = useAccount();
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(increment());
  };
  const handleMinus = () => {
    dispatch(decrement());
  };
  const [showSummary, setShowSummary] = useState<boolean>(true);

  const handleShowSummary = () => {
    return setShowSummary((prevState) => !prevState);
  };

  return (
    <section>
      <div className="flex w-full justify-between gap-[20px]">
        <div className="flex-grow pl-[35px] pt-[34px]">
          <Dashboard />
        </div>
        <div className="flex flex-col h-full gap-3 px-[26px] py-[20px] min-w-[330px]">
          <CreateLoan />
          <RecentPositionsList />
        </div>
      </div>
    </section>
  );
}
