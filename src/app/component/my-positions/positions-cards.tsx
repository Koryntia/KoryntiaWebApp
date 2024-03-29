import React, { useEffect, useState } from "react";
import Card, { CardProps } from "./_components/card";
import useAuth from "@/hooks/useAuth";
import { LoanData, getMyLoan } from "@/services/api/my-position";
import { positionCardsData } from "@/data";
import Slider from "react-slick";
import useElementWidth from "@/hooks/useElementWidth";

interface PositionCardsProps {
  positionCardsData: CardProps[];
  gridStyle?: string;
  isDashBoard?: boolean;
}

export const PositionCards = ({ isDashBoard }: PositionCardsProps) => {
  const [sectionWidth, sectionRef] = useElementWidth<HTMLDivElement>();
  const [slidesToShow, setSlidesToShow] = useState<number>(3);

  useEffect(() => {
    if (sectionWidth) {
      if (sectionWidth > 1800) {
        setSlidesToShow(5);
      } else if (sectionWidth < 768 && sectionWidth > 350) {
        setSlidesToShow(2);
      } else if (sectionWidth > 1200 && sectionWidth <= 1800) {
        setSlidesToShow(4);
      } else if (sectionWidth > 768 && sectionWidth <= 1200) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(1);
      }
    }
  }, [sectionWidth]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    arrows: false,
    slidesToScroll: 1,
  };

  const { address, logout, addressBalance } = useAuth();
  const [loanData, setLoanData] = useState<LoanData[]>();

  const handleGetMyLoanAPI = () => {
    if (!address) return;
    getMyLoan(address).then((data) => {
      if (data) {
        setLoanData(isDashBoard ? data.slice(0, 3) : data);
      }
    });
  };

  useEffect(() => {
    handleGetMyLoanAPI();
  }, []);

  return (
    <div className="w-full aspect-square h-[300px] " ref={sectionRef}>
      <Slider {...settings}>
        {positionCardsData &&
          positionCardsData.map((item, index) => (
            <div key={index} className="max-w-xs px-2 rounded-[15px] shadow">
              <Card
                title={item.title}
                bid={item.bid}
                description={item.description}
                image={item.image}
                time={item.time}
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};
