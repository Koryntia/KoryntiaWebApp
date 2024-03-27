"use client";
import Link from "next/link";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { GrMenu } from "react-icons/gr";
import type { Route } from "next";
import useAuth from "@/hooks/useAuth";
import { toggleSidebar } from "@/utils/sidebar";
import { Dispatch, SetStateAction } from "react";

type HeaderProps = {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ setSidebarOpen }: HeaderProps) => {
  const { address, logout, addressBalance } = useAuth();
  const shortenedAddress = `${address?.substring(0, 4)}...${address?.slice(
    -4
  )}`;
  return (
    <header className="sticky top-0 z-50 flex w-full h-[124px] bg-white shadow-sm">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              toggleSidebar(setSidebarOpen);
            }}
            className="z-50 block rounded-sm bg-white p-1.5 shadow-sm lg:hidden"
          >
            <GrMenu className="h-5 w-5" />
          </button>

          <Link className="block flex-shrink-0 lg:hidden" href={"/" as Route}>
            <Image
              width={32}
              height={32}
              src={"/koryntia-logo.png"}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="hidden sm:flex items-center justify-start border-none sm:w-[200px] md:w-[300px] lg:w-[473px] h-[52px] rounded-lg ">
          <form className="w-full h-full ">
            <div className="relative flex items-center h-full bg-inputBg py-2 px-4 rounded-xl gap-4 ">
              <button className="block">
                <CiSearch className="h-5 w-5" />
              </button>
              <input
                type="text"
                placeholder="Search items, collections, and users"
                className="text-sm bg-inputBg text-textGray focus:outline-none block  w-full"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {!address ? null : (
              <div className="">
                {/* <span className="text-sm p-0 m-0">
                  {addressBalance?.formatted.substring(0, 4)}{" "}
                  {addressBalance?.symbol}
                </span> */}
                <p className="text-base text-appColor1 font-bold border p-2 rounded-md border-appColor2 m-0">
                  {shortenedAddress}
                </p>
              </div>
            )}
            {/* {!address ? null : <KoryntiaToken />} */}
            <DropdownNotification />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
