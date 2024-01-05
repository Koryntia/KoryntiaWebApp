"use client";
import React from "react";
import { BsFilter } from "react-icons/bs";
import { GrCycle } from "react-icons/gr";
import type { IconType } from "react-icons";
import { AiOutlineDollarCircle } from "react-icons/ai";
import Image from "next/image";
import NoteIcon from "../../../../public/icons/noteIcon.svg";
import dollarIcon from "../../../../public/icons/dollar.svg";
import categoryIcon from "../../../../public/icons/category.svg";
import { PositionCards } from "../my-positions";
import { positionCardsData } from "@/data";

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

export const AvailablePositions = () => {
  return (
    <section className="">
      <div>
        <h3 className="text-[34px] font-semibold mb-4 leading-[44.2px] tracking-[0.34px] not-italic text-black222 ">
          Available Positions
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between">
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
          <BsFilter class="w-6 h-6" />
          Filter & Sort
        </button>
      </div>
      <PositionCards
        positionCardsData={positionCardsData}
        gridStyle="lg:grid-cols-4"
      />
    </section>
  );
};
