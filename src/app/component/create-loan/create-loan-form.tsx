import React, { ChangeEvent, useEffect, useState } from "react";
import Summary from "./Summary";
import { createNewLoan } from "@/services/api/loan-service";
import { calculatePeriodTimestamp } from "@/utils/helper";
import Button from "../elements/button/Button";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import init from "module-alias";
import { platform } from "os";

const INITIAL_THRESHOLD_PERCENTAGE = 15;
const PLATFORM_FEE = 12;
const INTEREST_PRECISION = 10 ** 18;
const LOAN_TOKEN_PRICE = 10;
const COLLATERAL_TOKEN_PRICE = 10;

interface FormValues {
   name: string;
   userAddress: string;
   loanAmount: string;
   loanToken?: string;
   collateralAmount: string;
   collateralToken?: string;
   loanPeriod: string;
   healthFactor: string;
   platformFee: string;
   interestRate: string;
   investorAddress: string;
   borrowedStatus: string;
   nftManager: string;
   nftVersion: string;
   liquidationThreshold: string;
   initialThreshold: string;
   loanRequestPeriod: string;
   creationDate: string;
   updatedDate: string;
}

interface CreateLoanFormProps {
   requestAmount: number;
   loanPeriod: number;
   collateralAmount: number;
   requestToken: string;
   collateralToken: string;
   liquidationThreshold: number;
   interestRate: number;
   name: string;
}

const CreateLoanForm: React.FC<CreateLoanFormProps> = ({
   requestAmount,
   loanPeriod,
   collateralAmount,
   requestToken,
   collateralToken,
   liquidationThreshold,
   interestRate,
   name,
}) => {
   const account = useAccount();
   const [connectedAccount, setConnectedAccount] = useState<string>(account?.address || "");
   const initialState: FormValues = {
      name: name,
      userAddress: connectedAccount,
      loanAmount: requestAmount.toString(),
      loanToken: requestToken,
      collateralAmount: collateralAmount.toString(),
      collateralToken: collateralToken,
      loanPeriod: loanPeriod.toString(),
      healthFactor: "to_be_made_dynamic",
      platformFee: ((requestAmount * PLATFORM_FEE) / 100).toFixed(4).toString(),
      investorAddress: "0x0000000000000000000000000000000000000000",
      borrowedStatus: "new",
      nftManager: "0x0000000000000000000000000000000000000000",
      nftVersion: "to_be_made_dynamic",
      liquidationThreshold: liquidationThreshold.toString(),
      interestRate: interestRate.toString(),
      initialThreshold: ((collateralAmount * INITIAL_THRESHOLD_PERCENTAGE) / requestAmount).toFixed(4).toString(),
      loanRequestPeriod: "2",
      updatedDate: new Date().toISOString(),
      creationDate: new Date().toISOString(),
   };

   const [formValues, setFormValues] = useState<FormValues>(initialState);
   const [formInvalid, setFormInvalid] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

   useEffect(() => {
      setConnectedAccount(account?.address || "");
   }, [account?.address]);

   useEffect(() => {
      setFormValues((prevValues) => ({
         ...prevValues,
         platformFee: ((+formValues.loanAmount * PLATFORM_FEE) / 100).toFixed(4).toString(),
         initialThreshold: ((+formValues.collateralAmount * INITIAL_THRESHOLD_PERCENTAGE) / +formValues.loanAmount)
            .toFixed(4)
            .toString(),
         healthFactor: calculateHealthFactor(
            +formValues.loanAmount,
            +formValues.collateralAmount,
            +formValues.liquidationThreshold,
            +formValues.interestRate
         )
            .toFixed(2)
            .toString(),
      }));
   }, [formValues.loanAmount, formValues.collateralAmount]);

   useEffect(() => {
      const { loanAmount, collateralAmount } = formValues;
      if (!+loanAmount || !+collateralAmount) {
         setFormInvalid(true);
         return;
      }

      setFormInvalid(false);
   }, [formValues]);

   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target;
      setFormValues((prevValues) => ({
         ...prevValues,
         [name]: value.toString(),
      }));
   };

   async function handleCreateLoanSubmit() {
      setIsSubmitting(true);
      try {
         if (formValues.userAddress === "") {
            toast.error("Please connect your wallet to create a loan");
            return;
         }

         if (formInvalid) {
            toast.error("Please fill all the required fields");
            return;
         }

         const data = {
            ...formValues,
            loanPeriod: convertYearsToISOFormat(formValues.loanPeriod),
            loanRequestPeriod: convertYearsToISOFormat(formValues.loanRequestPeriod),
         };

         const response: any = await createNewLoan(data);

         if (response.status === 201) {
            toast.success(response.message || "Successfully created a Loan");
         } else if (response.status === 400) {
            toast.error(response.message || "Failed to create loan");
         } else {
            toast.error(response.message || "Server Error: Failed to create Loan");
         }

         setIsSubmitting(false);
      } catch (error) {
         toast.error("An error occurred while creating the loan. Please try again.");
         setIsSubmitting(false);
      }
   }

   function convertYearsToISOFormat(years: string): string {
      const loanPeriodInYears = Number(years);
      const loanPeriodInSeconds = loanPeriodInYears * 365 * 24 * 60 * 60;
      const loanPeriodInISOFormat = new Date(Date.now() + loanPeriodInSeconds * 1000).toISOString();
      return loanPeriodInISOFormat;
   }

   function calculateHealthFactor(
      loanAmount: number,
      collateralAmount: number,
      liquidationThreshold: number,
      interestRate: number
   ): number {
      const totalDebt = loanAmount * (1 + interestRate / INTEREST_PRECISION) * LOAN_TOKEN_PRICE;
      const totalCollateral = collateralAmount * COLLATERAL_TOKEN_PRICE;
      return (totalCollateral * liquidationThreshold) / totalDebt;
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
                        name="loanAmount"
                        value={formValues.loanAmount}
                        onChange={handleChange}
                     />
                     <div className="w-[45%] flex gap-4 justify-center self-center relative">
                        <span className="h-full text-[#C3C8CA]">{"|"}</span>
                        <div className="flex justify-center items-center gap-2 relative">
                           <AiOutlineDollarCircle className="h-7 w-7 inline text-appColor1" /> {requestToken}
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
                        name="collateralAmount"
                        value={formValues.collateralAmount}
                        onChange={handleChange}
                     />
                     <div className="w-[45%] flex gap-4 justify-center self-center relative">
                        <span className="h-full text-[#C3C8CA]">{"|"}</span>
                        <div className="flex justify-center gap-2 items-center relative">
                           <AiOutlineDollarCircle className="h-7 w-7 inline text-appColor1" /> {collateralToken}
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
                        defaultValue={formValues.loanPeriod}
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
               healthFactor={formValues.healthFactor}
            />
         </div>
         <div className="flex gap-3" onClick={handleCreateLoanSubmit}>
            <Button isDisabled={formInvalid || isSubmitting} styling="py-3 px-3" variant="solid-purple">
               {isSubmitting ? "Requesting..." : "Request Loan"}
            </Button>
         </div>
      </section>
   );
};

export default CreateLoanForm;
