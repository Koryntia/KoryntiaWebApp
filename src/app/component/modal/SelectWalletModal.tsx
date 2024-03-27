"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { useConnect } from "wagmi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import WalletConnect from "@/app/svg/WalletConnect";
import MetaMask from "@/app/svg/MetaMask";
import CoinBase from "@/app/svg/CoinBase";
import { toggleModal } from "@/redux/features/auth-slice";

const SelectWalletModal = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { connectors, connect } = useConnect();

  const t = useTranslations("ConnectButton");
  const dispatch = useAppDispatch();

  const [AgreedToTermsOfServices, setAgreedToTermsOfServices] = useState<
    boolean | undefined
  >();

  function handleCloseModal() {
    dispatch(toggleModal(false));
  }

  const handleConnection = (connector: any) => {
    connect({ connector });
    handleCloseModal();
  };

  return (
    <div
      className={`flex inset-0  items-center justify-center bg-white03 bg-opacity-80 fixed top-0 left-0 w-full h-full`}
      style={{ zIndex: 9999 }}
    >
      <div className="">
        <span
          className="absolute top-0 right-10 text-appColor1 cursor-pointer text-4xl "
          onClick={handleCloseModal}
        >
          &times;
        </span>
        <div className="lg:flex lg:justify-center lg:items-center">
          <div
            className="w-[407px] h-[339px] shrink-0 bg-whiteFFF p-[40px] shadow-lg
            lg:rounded-tl-3xl lg:rounded-bl-2xl
            "
          >
            <div className="mt-4">
              <Image
                src={"/logo.png"}
                alt="koryntia logo"
                className=""
                width={150}
                height={32}
              />
            </div>
            <h2 className="text-dark mt-4 text-[28px] not-italic font-bold leading-9 tracking-[0.14px] ">
              Get Started
            </h2>
            <p className="text-[18px] my-2 text-darkText not-italic font-medium leading-[26px] tracking-[0.09px] ">
              Select your wallet
            </p>
            <p className="w-[337px] text-[16px] text-dark not-italic font-normal font-inter leading-6 tracking-[0.08px]">
              Connecting your wallet is like “logging in” to Web3. Select your
              wallet from the options to get started.
            </p>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                name="termOfService"
                onChange={(e) => setAgreedToTermsOfServices(e.target.checked)}
              />
              <label
                htmlFor="termOfService"
                className="text-dark text-[14px] tracking-[0.07px] leading-[22px] font-medium ml-2"
              >
                Agree to{" "}
                <span className="text-appColor1">Terms of services </span>
                and <span className="text-appColor1"> Privacy Policy</span>
              </label>
            </div>
          </div>
          <div
            className={`bg-purple3 w-[320px]
                  p-[40px] h-[339px] lg:rounded-tr-3xl lg:rounded-br-2xl shadow-lg`}
          >
            <div>
              {connectors.slice(0, 4).map((connector) => (
                <button
                  onClick={() => handleConnection(connector)}
                  key={connector.uid}
                  className="flex cursor-pointer items-center w-full mb-2 bg-white text-black rounded-lg flex-row  hover:bg-gray-100"
                >
                  <div className="rounded-l-lg px-3 py-2 bg-appColor1">
                    {connector.name === "MetaMask" && <MetaMask />}
                    {connector.name === "Safe" && <CoinBase />}
                    {connector.name === "WalletConnect" && <WalletConnect />}
                    {connector.name === "Injected" && <WalletConnect />}
                  </div>
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <span className="text-lg font-medium tracking-tight text-gray-900 ">
                      {connector.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectWalletModal;
