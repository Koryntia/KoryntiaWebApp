import React, { useEffect, useState } from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import Button from "../button/Button";
import CreateLoanForm from "./create-loan-form";
import { toast } from "react-toastify";

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

  const [loanPeriodValue, setLoanPeriodValue] = useState<LoanFormProps[]>([
    { name: "1 Year", value: "1" },
    { name: "2 Years", value: "2" },
    { name: "3 Years", value: "3" },
    { name: "4 Years", value: "4" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedRequestAmountOption, setSelectedRequestAmountOption] =
    useState<CurrencyOption | null>(null);
  const [selectedCollateralAmountOptions, setSelectedCollateralAmountOption] =
    useState<CurrencyOption | null>(null);
  const [requestAmount, setRequestAmount] = useState("");
  const [collateralAmount, setCollateralAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("1");
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
      Number(requestAmount) === 0 ||
      Number(collateralAmount) === 0 ||
      Number(loanPeriod) === 0;

    // Set formInvalid state based on validation result
    setFormInvalid(isFormInvalid);
  }, [requestAmount, collateralAmount, loanPeriod]);

  const handleRequestAmountOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;
    const selectedOption = requestAmountOptions.find(
      (option) => option.value === selectedValue
    );
    setSelectedRequestAmountOption(selectedOption || null);
  };

  const handleCollateralOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;
    const selectedOption = collateralAmountOptions.find(
      (option) => option.value === selectedValue
    );
    setSelectedCollateralAmountOption(selectedOption || null);
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
              <input
                type="text"
                placeholder="3,000.04"
                className="text-textBlack bg-transparent border border-transparent w-[55%] focus:outline-none"
                value={requestAmount}
                onChange={(e) => setRequestAmount(e.target.value)}
              />
              <div className="w-[45%] flex gap-4 justify-end self-center relative">
                <span className="h-full text-[#C3C8CA]">{"|"}</span>
                <div className="flex justify-center items-center relative">
                  <AiOutlineDollarCircle className="h-7 w-7 inline text-appColor1" />
                  <select
                    name="requestToken"
                    id="requestToken"
                    className="bg-transparent cursor-pointer focus:border-transparent outline-none"
                    onChange={handleRequestAmountOptionChange}
                  >
                    {requestAmountOptions.map((opt, idx) => (
                      <option key={idx} value={opt.value}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="request-amount flex flex-col gap-2 relative w-full">
            <h4 className="text-textBlack text-[16px] tracking-[0.16px] leading-[20.08px] font-inter font-medium my-1">
              Collateral Amount
            </h4>
            <div className="bg-gray-100 px-2 py-4 flex rounded-2xl relative">
              <input
                type="text"
                placeholder="3,000.04"
                className="text-textBlack bg-transparent border border-transparent w-[55%] focus:outline-none"
                value={collateralAmount}
                onChange={(e) => setCollateralAmount(e.target.value)}
              />
              <div className="w-[45%] flex gap-4 justify-end self-center relative">
                <span className="h-full text-[#C3C8CA]">{"|"}</span>
                <div className="flex justify-center gap-2 items-center relative">
                  <AiOutlineDollarCircle className="h-6 w-6 inline text-appColor1" />
                  <select
                    name="requestAmount"
                    id="requestAmount"
                    // className="bg-transparent cursor-pointer focus:border-transparent outline-none"
                    className="block w-full text-sm bg-transparent appearance-none  focus:outline-none focus:ring-0 peer"
                    onChange={handleCollateralOptionChange}
                  >
                    {collateralAmountOptions.map((opt, idx) => (
                      <option key={idx} value={opt.value}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
                className="block px-2 py-4 w-full text-sm bg-transparent appearance-none  focus:outline-none focus:ring-0 peer"
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
              &times;
            </span>
            <div className="flex items-center h-full px-4">
              <CreateLoanForm
                requestAmount={Number(requestAmount)}
                requestToken={selectedRequestAmountOption?.name || "USDT"}
                collateralToken={
                  selectedCollateralAmountOptions?.name || "USDT"
                }
                loanPeriod={Number(loanPeriod)}
                collateralAmount={Number(collateralAmount)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateLoan;
