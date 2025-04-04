"use client";
import { useState } from "react";
import Dashboard from "@/app/component/dashboard/Dashboard";
import RecentPositionsList from "@/app/component/common/Tables/recent-loans-container";
import CreateLoan from "@/app/component/create-loan/create-loan";

export default function Home() {
  const [showCreateLoan, setShowCreateLoan] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const handleToggleCreateLoan = () => {
    if (window.innerWidth < 768) {
      setShowCreateLoan((prev) => !prev);
    } else {
      setHighlight(true);
      setTimeout(() => setHighlight(false), 1000);
    }
  };

  return (
    <section className="relative w-full min-h-screen px-6 py-4 box-border">
      <div className="flex flex-wrap gap-4 pr-0 md:pr-[380px]">
        <div className="w-full">
          <Dashboard onToggleCreateLoan={handleToggleCreateLoan} />
        </div>
        <div className="w-full">
          <RecentPositionsList />
        </div>
      </div>
      <div
        className={`
          absolute top-0 right-0 w-[360px] h-full 
          px-4 py-5 overflow-y-auto bg-white border-l 
          ${showCreateLoan ? "block" : "hidden"} 
          md:block
          transition-all duration-500
          rounded-2xl
          ${highlight ? "ring-4 ring-purple-400" : ""}
          z-index: 100
        `}
      >
        <button
          onClick={handleToggleCreateLoan}
          className="md:hidden absolute top-2 right-2 text-appColor1 text-2xl"
        >
          &times;
        </button>
        <CreateLoan />
      </div>
    </section>
  );
}
