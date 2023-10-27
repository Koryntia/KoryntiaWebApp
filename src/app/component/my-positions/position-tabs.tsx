import React from 'react';
import { BsFilter } from 'react-icons/bs';
import { GrCycle } from 'react-icons/gr';
import type { IconType } from 'react-icons';
import { AiOutlineDollarCircle } from 'react-icons/ai';

type Tab = {
  label: string;
  href: string;
  icon: IconType;
};

const tabs: Tab[] = [
  {
    label: 'Created',
    href: '/mypositions/created',
    icon: GrCycle,
  },
  {
    label: 'Invested',
    href: '/mypositions/invested',
    icon: AiOutlineDollarCircle,
  },
  {
    label: 'Pending Action',
    href: '/mypositions/pending-action',
    icon: AiOutlineDollarCircle,
  },
];

export const PositionTabs = () => {
  return (
    <section className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
      <ol className="flex-1 flex flex-wrap gap-4 items-center justify-start">
        {tabs.map((tab) => (
          <li key={tab.label}>
            <a
              href={tab.href}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-neutral-200 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 gap-2"
            >
              <tab.icon className="w-6 h-6" />
              {tab.label}
            </a>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-neutral-200 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 gap-2"
      >
        <BsFilter class="w-6 h-6" />
        Filter & Sort
      </button>
    </section>
  );
};
