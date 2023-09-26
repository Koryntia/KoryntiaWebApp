import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MdExplore, MdOutlineShopTwo } from 'react-icons/md'
import { CiShop } from 'react-icons/ci'
import { TbWallet } from 'react-icons/tb'
import { RxDashboard } from 'react-icons/rx'
import { BsClock } from 'react-icons/bs'
import { PiChatCenteredDotsThin, PiGearSixThin } from 'react-icons/pi'


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute py-4 px-2 left-0 top-20 lg:top-0 z-50 flex h-screen w-[302] 
      flex-col overflow-y-hidden bg-white03 duration-300 ease-linear lg:static 
      lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <div className="flex justify-center items-center gap-2 lg:gap-4">
          <Link href="/">
            <Image
              width={50}
              height={50}
              src={"/templeuser.jpg"}
              alt="Logo"
              className="rounded-full"
            />
          </Link>
          <div className="hidden lg:block">
            <h2 className="text-textBlack text-[18px] font-semibold">Temple Ndukwu</h2>
            <p className="text-textGray text-[14px]">@temtechie</p>
          </div>
        </div>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-8 ">
          <div>
            <h3 className="mb-2 ml-4 text-base font-semibold text-textBlack">
              General
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  href="/"
                  className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${pathname === '/' || pathname === '' ?
                      "bg-purple2 text-appColor1" : "text-textGray"
                    }`}
                >
                  <MdExplore className="h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/message"
                  className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${pathname === '/message' ?
                      "bg-purple2 text-appColor1" : "text-textGray"
                    }`}
                >
                  <PiChatCenteredDotsThin className="h-5 w-5" />
                  Message
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${pathname === '/settings' ?
                      "bg-purple2 text-appColor1" : "text-textGray"
                    }`}
                >
                  <PiGearSixThin className="h-5 w-5" />
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 ml-4 text-base font-semibold text-textBlack">
              Marketplace
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  href="/market"
                  className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${pathname === '/market' ?
                      "bg-purple2 text-appColor1" : "text-textGray"
                    }`}
                >
                  <CiShop className="h-5 w-5" />
                  Market
                </Link>
              </li>
              <li>
                <Link
                  href="/mypositions"
                  className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${pathname === '/mypositions' ?
                      "bg-purple2 text-appColor1" : "text-textGray"
                    }`}
                >
                  <MdOutlineShopTwo className="h-5 w-5" />
                  My Positions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 ml-4 text-base font-semibold text-textBlack">
              My Profile
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  href="/collection"
                  className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${pathname === '/collection' ?
                      "bg-purple2 text-appColor1" : "text-textGray"
                    }`}
                >
                  <RxDashboard className="h-5 w-5" />
                  Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/wallet"
                  className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${pathname === '/wallet' ?
                      "bg-purple2 text-appColor1" : "text-textGray"
                    }`}
                >
                  <TbWallet className="h-5 w-5" />
                  Wallet
                </Link>
              </li>
              <li>
                <Link
                  href="/history"
                  className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${pathname === '/history' ?
                      "bg-purple2 text-appColor1" : "text-textGray"
                    }`}
                >
                  <BsClock className="h-5 w-5" />
                  History
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
