"use client";

import React from "react";
import Card, { CardProps } from "./_components/card";
import { positionCardsData } from "@/data";

interface PositionCardsProps {
  positionCardsData: CardProps[];
  gridStyle: string;
}

export const PositionCards = ({
  positionCardsData,
  gridStyle,
}: PositionCardsProps) => {
  return (
    <section
      className={`grid grid-cols-1 gap-4 place-items-center sm:grid-cols-2 ${gridStyle}`}
    >
      {positionCardsData.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </section>
  );
};
