"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Modal from "./modal/modal";
import useAuth from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";

type MainContentWrapperProps = {
  children: React.ReactNode;
};

const MainContentWrapper: React.FC<MainContentWrapperProps> = ({
  children,
}) => {
  const { address, connector, isConnected, login } = useAuth();
  const showModal = useAppSelector((state) => state.auth.showModal);

  console.log("showModal statua", showModal);
  console.log("showModal address", address);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header />
        <main>
          <div className="mx-auto w-full px-4 py-4 md:px-6 2xl:px-11">
            {children}
          </div>
        </main>
      </div>
      {showModal ? <Modal /> : null}
    </div>
  );
};

export default MainContentWrapper;
