export const calculatePeriodTimestamp = (period: number) => {
    // Get the current timestamp in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // Calculate the timestamp for the period in month(s) from now (in seconds)
    const periodLaterTimestamp = currentTimestamp + period * 30 * 24 * 60 * 60;
    // Convert the timestamp to uint32 (Solidity uint32 is 32 bits, so make sure it doesn't exceed that)
    // const uint32Date = periodLaterTimestamp % (2 ** 32);
    return periodLaterTimestamp
}


export const calculateInterestRate = () => {
    const INTEREST_PRECISION = 10000;
    // the actual interest rate in percentage is 3%
    const actualInterestRate = 3;
    // Calculate the scaled interest rate
    const scaledInterestRate = Math.floor(actualInterestRate * INTEREST_PRECISION);
    // Now you can pass scaledInterestRate to the smart contract function
    return scaledInterestRate
}