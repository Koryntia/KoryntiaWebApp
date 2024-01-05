import React, { ChangeEvent, useState } from "react";

import { useBlockNumber } from "wagmi";
import Summary from "./Summary";
import LoanButton from "./LoanButton";
import SelectToken from "../select-token";
import SelectLoanPeriod from "./select-loan-period";
import { allowedCoins, periodOptions } from "@/data";

type LoanFormProps = {
  name: string;
  value: string;
};

const CreateLoanForm = () => {
  const [showSummary, setShowSummary] = useState<boolean>(true);

  const handleShowSummary = () => {
    return setShowSummary((prevState) => !prevState);
  };

  const [selectedValue, setSelectedValue] = useState<string>("1");

  const { data, isError, isLoading } = useBlockNumber();

  const handleGetBlockTime = (s: string) => {
    const n = parseInt(s);
    if (isLoading) {
      return <div>Fetching block number</div>;
    }
    if (isError) {
      return <div>Error Fetching block number</div>;
    }
    let amountAdd = 216000 * n; //216000 is the number of blocks that represents 30 days
    let loanRepayDeadLineAddedAmount = BigInt(amountAdd);
    let loanRepayDeadLine = loanRepayDeadLineAddedAmount;
    if (data?.toString().length) {
      loanRepayDeadLine = loanRepayDeadLine + data;
      return <div> the date in blocks is {loanRepayDeadLine.toString()}</div>;
    }

    return <div>none</div>;
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <>
      <section>
        <div className="w-full  mx-auto">
          <h3 className="text-textBlack font-semibold leading-[23.4px] my-2">
            Create Loan position
          </h3>
          <form action="">
            <div>
              <label htmlFor="">Request Amount</label>
              <div className="bg-slate-100 rounded-xl">
                <input
                  type="number"
                  required
                  placeholder="Enter Amount"
                  className="p-2 m-2 bg-slate-200 outline-0 rounded-md"
                />
                <SelectToken options={allowedCoins} />
              </div>
            </div>
            <div>
              <label htmlFor="">Collateral Amount</label>
              <div className="bg-slate-100 rounded-xl">
                <input
                  type="number"
                  required
                  placeholder="Enter Amount"
                  className="p-2 m-2 bg-slate-200 outline-0 rounded-md"
                />
                <SelectToken options={allowedCoins} />
              </div>
            </div>
            <div>
              <label htmlFor="">Loan period</label>

              <div className="bg-slate-100 outline-0 rounded-xl flex">
                <span className="p-2 m-2 text-base font-normal text-gray-400 opacity-95 bg-slate-200 rounded-md w-60">
                  {`Payment in Month(s)`}
                </span>
                <SelectLoanPeriod
                  selectedValue={selectedValue}
                  handleSelectChange={handleSelectChange}
                  options={periodOptions}
                />
              </div>
            </div>
          </form>
        </div>
        <div>
          {
            showSummary && (
              <Summary />
            ) /*Here the inputs will be added to generate the loan calculations */
          }
        </div>
        <div className="py-5">
          {!showSummary && (
            <LoanButton
              title="Calculate Position"
              showSummary={showSummary}
              setShowSummary={setShowSummary}
              handleShowSummary={handleShowSummary}
            />
          )}
          {showSummary && (
            <div className="flex  gap-3">
              <button
                onClick={handleShowSummary}
                className="bg-red-500 flex-1 rounded-xl py-2 px-3 w-32 text-center text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleShowSummary}
                className="bg-appColor1 flex-1 rounded-xl py-2 px-3 w-32 text-center text-white"
              >
                Request Loan
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CreateLoanForm;
