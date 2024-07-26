import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import Button from "../elements/button/Button";
import CreateLoanForm from "./create-loan-form";
import { RoundedInput } from "../elements/Input";
import Select from "../elements/select";
import { AiOutlineDollarCircle } from "react-icons/ai";

type LoanFormProps = {
  name: string;
  value: string;
};

type CurrencyOption = {
  name: string;
  value: string;
};

const CreateLoan = () => {
  const requestAmountOptions: CurrencyOption[] = [
    { name: "USDT", value: "usdt" },
    { name: "BTC", value: "btc" },
    { name: "USDC", value: "usdc" },
    { name: "ETH", value: "eth" },
    { name: "MATIC", value: "matic" },
    { name: "SOL", value: "sol" },
  ];

  const collateralAmountOptions: CurrencyOption[] = [
    { name: "USDT", value: "usdt" },
    { name: "BTC", value: "btc" },
    { name: "USDC", value: "usdc" },
    { name: "ETH", value: "eth" },
    { name: "MATIC", value: "matic" },
    { name: "SOL", value: "sol" },
  ];

  const loanPeriodValue: LoanFormProps[] = [
    { name: "1 Year", value: "1" },
    { name: "2 Years", value: "2" },
    { name: "3 Years", value: "3" },
    { name: "4 Years", value: "4" },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedRequestAmountOption, setSelectedRequestAmountOption] = useState<CurrencyOption>(
    requestAmountOptions[0]
  );
  const [selectedCollateralAmountOptions, setSelectedCollateralAmountOption] = useState<CurrencyOption>(
    collateralAmountOptions[0]
  );
  const [requestAmount, setRequestAmount] = useState("");
  const [collateralAmount, setCollateralAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("1");
  const [liquidationThreshold, setLiquidationThreshold] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [name, setName] = useState("");
  const [formInvalid, setFormInvalid] = useState(false);

  const toggleModal = () => {
    if (formInvalid) {
      toast.error("Please provide loan details");
    } else {
      setShowModal(!showModal);
    }
  };

  useEffect(() => {
    // Perform form validation
    const isFormInvalid =
      +requestAmount === 0 ||
      +collateralAmount === 0 ||
      +loanPeriod === 0 ||
      +liquidationThreshold === 0 ||
      +interestRate === 0 ||
      name === "";

    // Set formInvalid state based on validation result
    setFormInvalid(isFormInvalid);
  }, [requestAmount, collateralAmount, loanPeriod, liquidationThreshold, interestRate, name]);

  const handleRequestAmountOptionChange = (selectedValue: string) => {
    const selectedOption = requestAmountOptions.find((option) => option.value === selectedValue);
    if (!selectedOption) return;
    setSelectedRequestAmountOption(selectedOption);
  };

  const handleCollateralOptionChange = (selectedValue: string) => {
    const selectedOption = collateralAmountOptions.find((option) => option.value === selectedValue);
    if (!selectedOption) return;
    setSelectedCollateralAmountOption(selectedOption);
  };


  return (
    <section className="">
      <div className="w-full h-full mx-auto flex flex-col gap-5">
        <h3 className="text-textBlack text-lg font-semibold font-raleway leading-[23.4px] mb-2">
          Create Loan position
        </h3>
        <div className="flex flex-col gap-4">
          <div className="request-amount flex flex-col gap-2 relative w-full">
            <h4 className="text-textBlack text-[16px] tracking-[0.16px] leading-[20.08px] font-inter font-medium my-1">
              Request Amount
            </h4>
            <div className="bg-gray-100 px-2 py-4 flex rounded-2xl relative">
              <RoundedInput
                placeholder="3,000.04"
                type="number"
                value={requestAmount}
                onChange={(e) => setRequestAmount(e.target.value)}
              />
              <div className="w-[45%] flex gap-4 justify-end self-center relative">
                <span className="h-full text-[#C3C8CA]">{"|"}</span>
                <div className="flex justify-center gap-2 items-center relative">
                  <AiOutlineDollarCircle className="h-6 w-6 inline text-appColor1" />
                  <Select
                    name="requestToken"
                    id="requestToken"
                    options={requestAmountOptions}
                    onChange={(selectedValue: string) => handleRequestAmountOptionChange(selectedValue)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="request-amount flex flex-col gap-2 relative w-full">
            <h4 className="text-textBlack text-[16px] tracking-[0.16px] leading-[20.08px] font-inter font-medium my-1">
              Collateral Amount
            </h4>
            <div className="bg-gray-100 px-2 py-4 flex rounded-2xl relative">
              <RoundedInput
                placeholder="3,000.04"
                type="number"
                value={collateralAmount}
                onChange={(e) => setCollateralAmount(e.target.value)}
              />
              <div className="w-[45%] flex gap-4 justify-end self-center relative">
                <span className="h-full text-[#C3C8CA]">{"|"}</span>
                <div className="flex justify-center gap-2 items-center relative">
                  <AiOutlineDollarCircle className="h-6 w-6 inline text-appColor1" />
                  <Select
                    name="requestAmount"
                    id="requestAmount"
                    options={collateralAmountOptions}
                    onChange={handleCollateralOptionChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="loan-period flex flex-col gap-2">
            <h4 className="text-textBlack text-[16px] tracking-[0.16px] leading-[20.08px] font-inter font-medium my-1">
              Liquidation Threshold
            </h4>
            <div className="bg-gray-100 px-2 rounded-2xl cursor-pointer">
              <input
                className="block px-2 py-4 w-full text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                type="number"
                placeholder="3,000.04"
                value={liquidationThreshold}
                onChange={(e) => setLiquidationThreshold(e.target.value)}
              />
            </div>
          </div>
          <div className="loan-period flex flex-col gap-2">
            <h4 className="text-textBlack text-[16px] tracking-[0.16px] leading-[20.08px] font-inter font-medium my-1">
              Interest Rate
            </h4>
            <div className="bg-gray-100 px-2 rounded-2xl cursor-pointer">
              <input
                className="block px-2 py-4 w-full text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                type="number"
                placeholder="15"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
          </div>
          <div className="loan-period flex flex-col gap-2">
            <h4 className="text-textBlack text-[16px] tracking-[0.16px] leading-[20.08px] font-inter font-medium my-1">
              Loan Period
            </h4>
            <div className="bg-gray-100 px-2 rounded-2xl cursor-pointer">
              <select
                name="loanPeriod"
                id="loanPeriod"
                className="block px-2 py-4 w-full text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                value={loanPeriod}
                onChange={(e) => setLoanPeriod(e.target.value)}
              >
                {loanPeriodValue.map((period, idx) => (
                  <option key={idx} value={period.value}>
                    {period.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="loan-period flex flex-col gap-2">
            <h4 className="text-textBlack text-[16px] tracking-[0.16px] leading-[20.08px] font-inter font-medium my-1">
              Title
            </h4>
            <div className="bg-gray-100 px-2 rounded-2xl cursor-pointer">
              <input
                className="block px-2 py-4 w-full text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                type="text"
                placeholder="eg. Dayco Serpentine Belt"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full" onClick={toggleModal}>
            <Button styling="py-4 px-6 text-[15px]" variant="solid-purple">
              Calculate Position
            </Button>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className={`fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-50`}
          style={{
            transition: "all 0.5s cubic-bezier(.68,-0.55,.27,1.55)",
            transform: `${showModal ? "translateX(0%)" : "translateX(-100%)"}`,
          }}
        >
          <div className="fixed top-0 right-0 bottom-0 bg-white  z-50 shadow-md">
            <span
              className="absolute top-0 right-5 text-appColor1 cursor-pointer text-4xl "
              onClick={toggleModal}
            >
              <div className="fixed top-0 right-0 bottom-0 bg-white  z-50 shadow-md">
                <span
                  className="absolute top-0 right-5 text-appColor1 cursor-pointer text-4xl "
                  onClick={toggleModal}
                >
                  &times;
                </span>
                <div className="flex items-center h-full px-4">
                  <CreateLoanForm
                    requestAmount={+requestAmount}
                    requestToken={selectedRequestAmountOption?.name}
                    collateralToken={selectedCollateralAmountOptions?.name}
                    loanPeriod={+loanPeriod}
                    collateralAmount={+collateralAmount}
                    liquidationThreshold={+liquidationThreshold}
                    interestRate={+interestRate}
                    name={name}
                  />
                </div>
              </div>
            </span>
          </div>
        </div>
      )
      }
    </section >
  );
};

export default CreateLoan;
