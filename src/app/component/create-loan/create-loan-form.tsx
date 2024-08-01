import React, { ChangeEvent, useEffect, useState } from "react";
import Summary from "./Summary";
import { createNewLoan } from "@/services/api/loan-service";
import Button from "../elements/button/Button";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useAccount } from "wagmi";
import { getPriceApi } from "@/services/api/getPrice";

const INITIAL_THRESHOLD_PERCENTAGE = 15;
const PLATFORM_FEE = 12;
const INTEREST_PRECISION = 10 ** 18;
import toast from "react-hot-toast";
import { STATUS } from "@/interfaces/loan-interface";

interface FormValues {
   name: string;
   userAddress: string;
   loanAmount: string;
   loanToken: string;
   collateralAmount: string;
   collateralToken: string;
   loanPeriod: Date;
   loanRequestPeriod: Date;
   healthFactor: string;
   interestRate: string;
   investorAddress: string;
   loanStatus: STATUS;
   nftManager: string;
   nftVersion: string;
   liquidationThreshold: string;
   initialThreshold: string;
   creationDate: Date;
   updatedDate: Date;
}

interface CreateLoanFormProps {
   requestAmount: number;
   loanPeriod: number;
   collateralAmount: number;
   requestToken: string;
   collateralToken: string;
   initialThreshold: number;
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
   initialThreshold,
   interestRate,
   name,
}) => {
   const account = useAccount();
   const [connectedAccount, setConnectedAccount] = useState<string>(account?.address || "");
   const [loanTokenPrice, setLoanTokenPrice] = useState<number>(0);
   const [collateralTokenPrice, setCollateralTokenPrice] = useState<number>(0);
   const platformFee = ((requestAmount * PLATFORM_FEE) / 100).toFixed(4).toString();

   const initialState: FormValues = {
      name: name,
      userAddress: connectedAccount,
      loanAmount: requestAmount.toString(),
      loanToken: requestToken,
      collateralAmount: collateralAmount.toString(),
      collateralToken: collateralToken,
      loanPeriod: convertYearsToDateFormat(loanPeriod.toString()),
      healthFactor: "to_be_made_dynamic",
      investorAddress: "0x0000000000000000000000000000000000000000",
      loanStatus: STATUS.pending,
      nftManager: "0x0000000000000000000000000000000000000000",
      nftVersion: "to_be_made_dynamic",
      liquidationThreshold: liquidationThreshold.toString(),
      interestRate: interestRate.toString(),
      initialThreshold: initialThreshold.toString(),
      loanRequestPeriod: convertDaysToDateFormat("30"),
      updatedDate: new Date(),
      creationDate: new Date(),
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
         healthFactor: calculateHealthFactor(
            +formValues.loanAmount,
            +formValues.collateralAmount,
            +formValues.liquidationThreshold,
            +formValues.interestRate,
            loanTokenPrice,
            collateralTokenPrice
         )
            .toFixed(2)
            .toString(),
      }));
   }, [formValues.loanAmount, formValues.collateralAmount, loanTokenPrice, collateralTokenPrice, formValues.liquidationThreshold, formValues.interestRate]);

   useEffect(() => {
      const { loanAmount, collateralAmount, healthFactor } = formValues;
      if (!+loanAmount || !+collateralAmount || !+healthFactor) {
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

         console.log(formValues)

         if (formInvalid) {
            toast.error("Please fill all the required fields");
            return;
         }

         const data = {
            ...formValues,
         };

         const response: any = await createNewLoan(data);
         console.log(response)

         if (response.data.status === 201) {
            toast.success(response.data.message || "Successfully created a Loan");
         } else if (response.data.status === 400) {
            toast.error(response.data.message || "Failed to create loan");
         } else {
            toast.error(response.data.message || "Server Error: Failed to create Loan");
         }
         setIsSubmitting(false);
      } catch (error) {
         console.log(error)
         toast.error("An error occurred while creating the loan. Please try again.");
         setIsSubmitting(false);
      }
   }

   function convertYearsToDateFormat(years: string): Date {
      const loanPeriodInYears = Number(years);
      const loanPeriodInSeconds = loanPeriodInYears * 365 * 24 * 60 * 60;
      const loanPeriodInISOFormat = new Date(Date.now() + loanPeriodInSeconds * 1000);
      return loanPeriodInISOFormat;
   }

   function convertDaysToDateFormat(days: string): Date {
      const loanPeriodInDays = Number(days);
      const loanPeriodInSeconds = loanPeriodInDays * 24 * 60 * 60;
      const loanPeriodInISOFormat = new Date(Date.now() + loanPeriodInSeconds * 1000);
      return loanPeriodInISOFormat;
   }

   function calculateHealthFactor(
      loanAmount: number,
      collateralAmount: number,
      liquidationThreshold: number,
      interestRate: number,
      loanTokenPrice: number,
      collateralTokenPrice: number
   ): number {
      const totalDebt = loanAmount * (1 + interestRate / INTEREST_PRECISION) * loanTokenPrice;
      const totalCollateral = collateralAmount * collateralTokenPrice;
      return (totalCollateral * liquidationThreshold) / totalDebt;
   }

   async function getLoanTokenPrice(token: string) {
      const data = await getPriceApi(token + "/USD");
      setLoanTokenPrice(data?.price || 0);
   }

   async function getCollateralTokenPrice(token: string) {
      const data = await getPriceApi(token + "/USD");
      setCollateralTokenPrice(data?.price || 0);
   }

   useEffect(() => {
      getCollateralTokenPrice(formValues.collateralToken || "");
      getLoanTokenPrice(formValues.loanToken || "");
   }, [formValues.collateralToken, formValues.loanToken]);

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
                     <span
                        id="loanPeriod"
                        className="bg-transparent w-full focus:border-transparent outline-none cursor-pointer"
                        defaultValue={loanPeriod}
                     >
                        {loanPeriod} Year
                     </span>
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
               platformFee={platformFee}
               period={loanPeriod.toString()}
               healthFactor={formValues.healthFactor}
               loanToken={formValues.loanToken}
               collateralToken={formValues.collateralToken}
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
