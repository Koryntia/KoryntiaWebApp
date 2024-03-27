"use client";
import Cardcontainer from "@/app/component/common/Cards/cardcontainer";
import { useState } from "react";
import { useAccount, useBlockNumber } from "wagmi";
import Balance from "@/app/component/functions/BalanceFinder";

const CollectionPage = () => {
  const [selectedValue, setSelectedValue] = useState<string>("1");
  const [showResult, setShowResult] = useState<boolean>(false);
  const { data, isError, isLoading } = useBlockNumber();

  const handleGetBlockTime = (s: string) => {
    const n = parseInt(s);
    if (isLoading) {
      return <div>Fetching block number</div>;
    }
    if (isError) {
      return <div>Error Fetching block number</div>;
    }
    const amountAdd = 216000 * n; //216000 is the number of blocks that represents 30 days
    const loanRepayDeadLineAddedAmount = BigInt(amountAdd);
    let loanRepayDeadLine = loanRepayDeadLineAddedAmount;
    if (data?.toString().length) {
      loanRepayDeadLine = loanRepayDeadLine + data;
      return <div> the date in blocks is {loanRepayDeadLine.toString()}</div>;
    }

    return <div>none</div>;
  };

  const { address } = useAccount();

  const checkAddres = (address: any) => {
    if (address !== undefined && address.length) {
      return <Balance address={address} />;
    }

    return <span>nope</span>;
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <Cardcontainer />
      {checkAddres(address)}
      <label>
        Select a value between 1 and 6:
        <select value={selectedValue} onChange={handleSelectChange}>
          {[1, 2, 3, 4, 5, 6].map((value) => (
            <option key={value} value={value.toString()}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => setShowResult(true)}>invocar</button>
      {showResult && handleGetBlockTime(selectedValue)}
    </>
  );
};

export default CollectionPage;
