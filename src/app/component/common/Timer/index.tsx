import { useEffect, useState } from "react";

type TimerProps = {
  endTime: Date;
};

const Timer = ({ endTime }: TimerProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time: number) => {
    return time < 10 ? "0" + time : time;
  };

  const timeDifference = Math.max(0, endTime.getTime() - currentTime.getTime());
  const days = Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return (
    <>
      <button className="text-[16px] mr-1 not-italic font-semibold leading-[26px] tracking-[0.2px] bg-gray-200 px-1 rounded-md">
        {formatTime(days)}
      </button>
      {":"}
      <button className="text-[16px] mr-1 not-italic font-semibold leading-[26px] tracking-[0.2px] bg-gray-200 px-1 rounded-md">
        {formatTime(hours)}
      </button>
      {":"}
      <button className="text-[16px] mx-1 not-italic font-semibold leading-[26px] tracking-[0.2px] bg-gray-200 px-1 rounded-md">
        {formatTime(minutes)}
      </button>
      {":"}
      <button className="text-[16px] ml-1 not-italic font-semibold leading-[26px] tracking-[0.2px] bg-gray-200 px-1 rounded-md">
        {formatTime(seconds)}
      </button>
    </>
  );
};

export default Timer;
