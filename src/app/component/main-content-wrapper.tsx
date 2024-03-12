"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Modal from "./modal/modal";
import useAuth from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";
import { addNewUserWallet } from "@/services/api/user";

type MainContentWrapperProps = {
  children: React.ReactNode;
};

const MainContentWrapper: React.FC<MainContentWrapperProps> = ({
  children,
}) => {
  const { address, login } = useAuth();
  const showModal = useAppSelector((state) => state.auth.showModal);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (address) {
      const createNewUser = async () => {
        try {
          const newUser = await addNewUserWallet(address.toString());
        } catch (error) {
          console.error("Error adding new user wallet:", error);
        }
      };
      createNewUser();
    }
  }, [address]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="w-full">{children}</div>
        </main>
      </div>
      {showModal ? <Modal /> : null}
    </div>
  );
};

export default MainContentWrapper;
