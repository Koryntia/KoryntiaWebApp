"use client";
import { useState } from "react";

import CreateLoanForm from "../component/create-loan/create-loan-form";

import LoanButton from "../component/create-loan/LoanButton";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { decrement, increment } from "../../redux/features/count-slice";

import Summary from "../component/create-loan/Summary";

import { useAccount } from "wagmi";
import Dashboard from "../component/dashboard/Dashboard";

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
      <div className="flex w-full">
        <div className="dashboard-column-1 w-[900px] h-full">
          <Dashboard />
        </div>
        <div className="dashboard-column-2 w-[330px] h-full">
          <div>
            <CreateLoanForm />
          </div>
        </div>
      </div>
    </section>
  );
}
