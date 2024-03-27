import { DateTime, Interval } from "luxon";

export const calculatePeriodTimestamp = (period: number) => {
  // Get the current timestamp in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);
  // Calculate the timestamp for the period in month(s) from now (in seconds)
  const periodLaterTimestamp = currentTimestamp + period * 30 * 24 * 60 * 60;
  // Convert the timestamp to uint32 (Solidity uint32 is 32 bits, so make sure it doesn't exceed that)
  // const uint32Date = periodLaterTimestamp % (2 ** 32);
  return periodLaterTimestamp;
};

export const calculateInterestRate = () => {
  const INTEREST_PRECISION = 10000;
  // the actual interest rate in percentage is 3%
  const actualInterestRate = 3;
  // Calculate the scaled interest rate
  const scaledInterestRate = Math.floor(
    actualInterestRate * INTEREST_PRECISION
  );
  // Now you can pass scaledInterestRate to the smart contract function
  return scaledInterestRate;
};

export const calculateSlidesToShow = (width: number): number => {
  if (width > 1800) {
    return 5;
  } else if (width < 768 && width > 350) {
    return 2;
  } else if (width > 1200 && width <= 1800) {
    return 4;
  } else if (width > 768 && width <= 1200) {
    return 3;
  } else {
    return 1;
  }
};

export const calculateTPass = (startDate: any) => {
  const now = DateTime.now();
  const timeDifference = Interval.fromDateTimes(startDate, now);
  const secondsDifference = timeDifference.count("seconds");
  const hours = Math.floor(secondsDifference / 3600);
  const remainingSeconds = secondsDifference % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return { hours, minutes, seconds };
};
