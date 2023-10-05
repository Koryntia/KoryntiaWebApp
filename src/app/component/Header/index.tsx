'use client'
import Link from "next/link";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import KoryntiaToken from "./KoryntiaToken";
import { CiSearch } from 'react-icons/ci';
import { GrMenu } from 'react-icons/gr';
import { useState } from "react";


const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 flex w-full bg-white shadow-sm">
            <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSidebarOpen(!sidebarOpen);
                        }}
                        className="z-50 block rounded-sm bg-white p-1.5 shadow-sm lg:hidden"
                    >

                        <GrMenu className="h-5 w-5" />
                    </button>

                    <Link className="block flex-shrink-0 lg:hidden" href="/">
                        <Image
                            width={32}
                            height={32}
                            src={"/koryntia-logo.png"}
                            alt="Logo"
                        />
                    </Link>
                </div>

                <div className="hidden sm:block">
                    <form>
                        <div className="relative flex items-center bg-inputBg py-2 px-4 rounded-xl gap-2">
                            <button className="block">
                                <CiSearch className="h-5 w-5" />
                            </button>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="
                                text-sm 
                                bg-inputBg 
                                text-textGray
                                focus:outline-none
                                block
                                "
                            />
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <KoryntiaToken />
                        <DropdownNotification />
                    </ul>
                    <DropdownUser />
                </div>
            </div>
        </header>
    );
};

export default Header;
