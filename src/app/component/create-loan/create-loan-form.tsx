"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useBlockNumber } from "wagmi";
import Summary from "./Summary";
import LoanButton from "./LoanButton";
import SelectLoanPeriod from "./select-loan-period";
import { allowedCoins, periodOptions } from "@/data";
import SelectLoanToken from "./select-loan-token";
import SelectCollateralToken from "./select-collateral-token";
import { createNewLoan } from "@/services/api/loan-service";
import { useAccount, useWriteContract } from "wagmi";
import abi from "../../../abis/loanPositionManager";
import { calculatePeriodTimestamp } from "@/utils/helper";

interface FormValues {
  address: any | `0x${string}`;
  loanAmount: number;
  loanAmountToken: string;
  collateralAmount: number;
  collateralAmountToken: string;
  loanPeriod: number;
  loanRequestDeadline: number;

  interestRate: any;
}

const CreateLoanForm = () => {
  const { address, status } = useAccount();
  const [loanRequestDeadlinePeriod, setLoanRequestDeadlinePeriod] =
    useState<number>(0);

  const initialState: FormValues = {
    address: status === "connected" ? address : "",
    loanAmount: 0,
    loanAmountToken: "",
    collateralAmount: 0,
    collateralAmountToken: "",
    loanPeriod: 0,
    loanRequestDeadline: loanRequestDeadlinePeriod,

    interestRate: 30000,
  };

  const [showSummary, setShowSummary] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [userWalletAddress, setUserWalletAddress] = useState<any>("");

  const handleShowSummary = () => {
    return setShowSummary((prevState) => !prevState);
  };

  function calculatePeriod(period: number) {
    const result = calculatePeriodTimestamp(period);

    setFormValues((prevValues) => ({
      ...prevValues,
      ["loanPeriod"]: result,
    }));
  }

  useEffect(() => {
    setUserWalletAddress(address);
  }, [address]);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  async function handleCreateLoanSubmit() {
    await createNewLoan(formValues);
    setShowSummary((prevState) => !prevState);
  }

  const { data: hash, writeContract } = useWriteContract();

  // async function submit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   writeContract({
  //     address: userWalletAddress,
  //     abi,
  //     functionName: "createLoanPosition",
  //     args: [
  //       address,
  //       formValues?.loanAmount,
  //       formValues?.loanAmountToken,
  //       formValues?.collateralAmount,
  //       formValues?.collateralAmountToken,
  //       formValues?.loanPeriod,
  //       formValues?.interestRate,
  //     ],
  //   });
  // }

  console.log("formValues", formValues);

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
                  name="loanAmount"
                  placeholder="Enter Amount"
                  className="p-2 m-2 bg-slate-200 outline-0 rounded-md"
                  onChange={handleChange}
                />
                <SelectLoanToken
                  options={allowedCoins}
                  handleChange={handleChange}
                  formValues={formValues.loanAmountToken}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Collateral Amount</label>
              <div className="bg-slate-100 rounded-xl">
                <input
                  type="number"
                  required
                  name="collateralAmount"
                  onChange={handleChange}
                  placeholder="Enter Amount"
                  className="p-2 m-2 bg-slate-200 outline-0 rounded-md"
                />
                <SelectCollateralToken
                  options={allowedCoins}
                  handleChange={handleChange}
                  formValues={formValues.collateralAmountToken}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Loan period</label>

              <div className="bg-slate-100 outline-0 rounded-xl flex">
                <span className="p-2 m-2 text-base font-normal text-gray-400 opacity-95 bg-slate-200 rounded-md w-60">
                  {`Payment in Month(s)`}
                </span>
                <SelectLoanPeriod
                  handleChange={handleChange}
                  formValues={formValues.loanPeriod}
                  options={periodOptions}
                  calculatePeriod={calculatePeriod}
                />
              </div>
            </div>
          </form>
        </div>
        <div>
          {
            showSummary && (
              <Summary
                borrowingAmount={formValues.loanAmount}
                collateral={formValues.collateralAmount}
                collateralRate={formValues.interestRate}
                platformFee={"1%"}
                period={formValues.loanPeriod}
              />
            ) /*Here the inputs will be added to generate the loan calculations */
          }
        </div>
        <div className="py-5">
          {!showSummary && (
            <LoanButton
              disabledButton={!address ? true : false}
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
                onClick={handleCreateLoanSubmit}
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
