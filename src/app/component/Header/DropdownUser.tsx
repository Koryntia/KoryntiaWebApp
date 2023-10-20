'use client'
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiArrowDownSLine } from 'react-icons/ri';
import { HiOutlinePower } from 'react-icons/hi2';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { BiUser } from 'react-icons/bi';
import { useDisconnect } from "wagmi";

 
const handleDisconnect = () => {
  return ( useDisconnect() );
}
 

const  DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={'/templeuser.jpg'}
            alt="User"
            className="rounded-full"
          />
        </span>

        <RiArrowDownSLine className="h-5 w-5 text-textNeutral hover:text-appColor1" />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-64 flex-col rounded-sm border border-gray-200 bg-white shadow-md ${dropdownOpen === true ? "block" : "hidden"
          }`}
      >
        <ul className="flex flex-col gap-4 border-b px-6 py-8">
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-appColor1 lg:text-base"
            >
              <BiUser className="h-5 w-5" />
              My Profile
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-appColor1 lg:text-base"
            >
              <MdOutlineManageAccounts className="h-5 w-5" />
              Account Settings
            </Link>
          </li>
        </ul>
        <button onClick={handleDisconnect} className="flex items-center gap-2 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-appColor1 lg:text-base">
          <HiOutlinePower className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
