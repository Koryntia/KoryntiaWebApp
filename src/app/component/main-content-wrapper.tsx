"use client";
import React, { useEffect } from "react";
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
