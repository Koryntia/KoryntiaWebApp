"use client";
import { BsFilter } from "react-icons/bs";
import Image from "next/image";
import NoteIcon from "../../../../public/icons/noteIcon.svg";
import dollarIcon from "../../../../public/icons/dollar.svg";
import categoryIcon from "../../../../public/icons/category.svg";
import { positionCardsData } from "@/data";
import { AvailablePositions } from "./positions";

type Tab = {
   label: string;
   href: string;
   icon: any;
};

const tabs: Tab[] = [
   {
      label: "Category",
      href: "/mypositions/created",
      icon: categoryIcon,
   },
   {
      label: "Collections",
      href: "/mypositions/invested",
      icon: NoteIcon,
   },
   {
      label: "Price Range",
      href: "/mypositions/pending-action",
      icon: dollarIcon,
   },
];

export default function Market() {
   return (
      <section className="w-full h-full p-8">
         <div>
            <h3 className="text-neutral-800 text-[34px] font-semibold font-raleway leading-[44.20px] tracking-tight">
               Available Positions
            </h3>
         </div>
         <div className="flex flex-col lg:flex-row lg:justify-between mt-5">
            <ol className="flex-1 flex flex-wrap gap-4 items-center justify-start">
               {tabs.map((tab) => (
                  <li key={tab.label}>
                     <a
                        href={tab.href}
                        className="inline-flex items-center justify-center rounded-xl border border-neutral-200 text-sm font-medium px-4 py-2 gap-2"
                     >
                        <Image src={tab.icon} alt="icon image" height={20} width={20} />
                        {tab.label}
                     </a>
                  </li>
               ))}
            </ol>
            <button
               type="button"
               className="inline-flex items-center justify-center rounded-xl border border-neutral-200 text-sm font-medium px-4 py-1 gap-2"
            >
               <BsFilter className="w-6 h-6" />
               Filter & Sort
            </button>
         </div>
         <AvailablePositions positionCardsData={positionCardsData} />
      </section>
   );
}
