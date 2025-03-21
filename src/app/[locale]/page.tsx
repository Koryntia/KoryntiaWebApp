"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { decrement, increment } from "../../redux/features/count-slice";
import { useAccount } from "wagmi";
import Dashboard from "@/app/component/dashboard/Dashboard";
import RecentPositionsList from "@/app/component/common/Tables/recent-loans-container";
import CreateLoan from "@/app/component/create-loan/create-loan";

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
    setShowSummary((prevState) => !prevState);
  };

  return (
    <section className="relative w-full min-h-screen px-6 py-4 box-border">
      <div className="flex flex-wrap pr-[360px] gap-4">
        <div className="w-full">
          <Dashboard />
        </div>
        <div className="w-full">
          <RecentPositionsList />
        </div>
      </div>
      <div className="absolute top-0 right-0 w-[360px] h-full bg-white border-l px-4 py-5 overflow-y-auto">
        <CreateLoan />
      </div>
    </section>
  );
}
