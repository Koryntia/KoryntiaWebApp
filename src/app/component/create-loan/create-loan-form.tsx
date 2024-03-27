import React, { ChangeEvent, useEffect, useState } from "react";
import Summary from "./Summary";
import { createNewLoan } from "@/services/api/loan-service";
import { calculatePeriodTimestamp } from "@/utils/helper";
import Button from "../elements/button/Button";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";

interface FormValues {
  userAddress: string;
  loanAmount: number;
  loanToken?: string;
  collateralAmount: number;
  collateralToken?: string;
  loanPeriod: number;
  healthFactor: number;
  platformFee: number;
  interestRate: number;
}

interface CreateLoanFormProps {
  requestAmount: number;
  loanPeriod: number;
  collateralAmount: number;
  requestToken?: string;
  collateralToken?: string;
}

const CreateLoanForm: React.FC<CreateLoanFormProps> = ({
  requestAmount,
  loanPeriod,
  collateralAmount,
  requestToken,
  collateralToken,
}) => {
  const account = useAccount();
  const [connectedAccount, setConnectedAccount] = useState<string>(
    account?.address || ""
  );
  const initialState: FormValues = {
    userAddress: connectedAccount,
    loanAmount: 0,
    loanToken: "",
    collateralAmount: 0,
    collateralToken: "",
    loanPeriod: 60,
    healthFactor: 11,
    platformFee: 69,
    interestRate: 300,
  };

  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [formInvalid, setFormInvalid] = useState(false);

  useEffect(() => {
    // Update the loan amount, collateral amount, and loan period when props change
    setFormValues((prevValues) => ({
      ...prevValues,
      loanAmount: requestAmount,
      collateralAmount: collateralAmount,
      loanPeriod: loanPeriod,
      loanToken: requestToken,
      collateralToken: collateralToken,
    }));

    // Perform form validation
    const isFormInvalid =
      requestToken === "" ||
      collateralToken === "" ||
      requestAmount === 0 ||
      collateralAmount === 0 ||
      loanPeriod === 0;

    // Set formInvalid state based on validation result
    setFormInvalid(isFormInvalid);
  }, [
    requestAmount,
    loanPeriod,
    collateralAmount,
    collateralToken,
    requestToken,
  ]);

  useEffect(() => {
    setConnectedAccount(account?.address || "");
  }, [account?.address]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: numericValue,
    }));
  };

  async function handleCreateLoanSubmit() {
    try {
      const response = await createNewLoan(formValues);

      if (response.status === 201) {
        toast.success(response.message || "Successfully created a Loan");
      } else if (response.status === 400) {
        toast.error(response.data.message || "Failed to create loan");
      } else {
        toast.error(
          response.data.message || "Server Error: Failed to create Loan"
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred while creating the loan. Please try again."
      );
    }
  }

  return (
    <section className="w-full flex flex-col gap-2">
      <div className="w-full mx-auto flex flex-col gap-3">
        <h3 className="text-textBlack text-lg font-semibold font-raleway leading-[23.4px] mb-2">
          Create Loan position
        </h3>
        <form className="flex flex-col gap-2" action="">
          <div className="flex flex-col gap-1">
            <label
              className="text-textBlack text-[16px] tracking-[0.16px] leading-[20.08px] font-inter font-medium my-1"
              htmlFor=""
            >
              Request Amount
            </label>
            <div className="bg-gray-100 px-2 py-4 flex rounded-2xl relative">
              <input
                type="number"
                placeholder="3,000.04"
                className="text-textBlack bg-transparent border border-transparent w-[55%]"
                value={formValues.loanAmount}
                onChange={handleChange}
              />
              <div className="w-[45%] flex gap-4 justify-center self-center relative">
                <span className="h-full text-[#C3C8CA]">{"|"}</span>
                <div className="flex justify-center items-center gap-2 relative">
                  <AiOutlineDollarCircle className="h-7 w-7 inline text-appColor1" />{" "}
                  {requestToken}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-textBlack text-[16px] tracking-[0.16px] leading-[20.08px] font-inter font-medium my-1"
              htmlFor=""
            >
              Collateral Amount
            </label>
            <div className="bg-gray-100 px-2 py-4 flex rounded-2xl relative">
              <input
                type="number"
                placeholder="3,000.04"
                className="text-textBlack bg-transparent border border-transparent w-[55%]"
                value={formValues.collateralAmount}
                onChange={handleChange}
              />
              <div className="w-[45%] flex gap-4 justify-center self-center relative">
                <span className="h-full text-[#C3C8CA]">{"|"}</span>
                <div className="flex justify-center gap-2 items-center relative">
                  <AiOutlineDollarCircle className="h-7 w-7 inline text-appColor1" />{" "}
                  {collateralToken}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-textBlack text-[16px] tracking-[0.16px] leading-[20.08px] font-inter font-medium my-1">
              Loan Period
            </h4>
            <div className="bg-gray-100 px-2 py-4 rounded-2xl cursor-pointer">
              <select
                name="loanPeriod"
                id="loanPeriod"
                className="bg-transparent w-full focus:border-transparent outline-none cursor-pointer"
                value={formValues.loanPeriod}
              >
                <option>{formValues.loanPeriod} Year</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <hr className="text-black mt-4" />
      <div>
        <Summary
          borrowingAmount={formValues.loanAmount}
          collateral={formValues?.collateralAmount}
          collateralRate={formValues.interestRate}
          platformFee={formValues.platformFee}
          period={formValues.loanPeriod}
        />
      </div>
      <div className="flex gap-3" onClick={handleCreateLoanSubmit}>
        <Button
          isDisabled={formInvalid}
          styling="py-3 px-3"
          variant="solid-purple"
        >
          Request Loan
        </Button>
      </div>
    </section>
  );
};

export default CreateLoanForm;
