import { AiOutlineDollarCircle } from "react-icons/ai";
import Modal from "../common/Modal";
import { useState } from "react";
import LoanSummaryContainer from "../create-loan/LoanSummaryContainer";
import LoanSummary from "../create-loan/LoanSummary";
import Button from "../elements/button/Button";

import { collateralAmountOptions } from "@/constant/liquidation";
import { CurrencyOption, LiquidationModalProps } from "@/types/liquidation";

const LiquidationModal = (props: LiquidationModalProps) => {
   const { open, handleClose, data } = props;
   const [selectedCollateralAmountOptions, setSelectedCollateralAmountOption] = useState<CurrencyOption | null>(null);
   const [collateralAmount, setCollateralAmount] = useState("");

   const handleCollateralOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
      const selectedOption = collateralAmountOptions.find((option) => option.value === selectedValue);
      setSelectedCollateralAmountOption(selectedOption || null);
   };

   return (
      <Modal showModal={open} toggleModal={handleClose}>
         <div className="w-[330px] pt-5 px-6 flex flex-col gap-6">
            <span className="text-neutral-800 text-lg font-semibold font-['Raleway'] leading-normal">
               Liquidate position
            </span>
            <div className="request-amount flex flex-col gap-2 relative w-full mt-[10px]">
               <h4 className="text-textBlack text-base font-medium font-['Inter'] leading-tight tracking-tight">
                  Replay Amount
               </h4>
               <div className="bg-gray-100 px-2 py-4 flex rounded-2xl relative">
                  <input
                     type="text"
                     placeholder="1,000.04"
                     className="text-textBlack bg-transparent border border-transparent w-[55%] focus:outline-none"
                     value={collateralAmount}
                     onChange={(e) => setCollateralAmount(e.target.value)}
                  />
                  <div className="w-[45%] flex gap-4 justify-end self-center relative">
                     <span className="h-full text-[#C3C8CA]">{"|"}</span>
                     <div className="flex justify-center gap-2 items-center relative">
                        <AiOutlineDollarCircle size={24} className="inline text-appColor1" />
                        <select
                           name="requestAmount"
                           id="requestAmount"
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
            <hr />
            <div className="py-3">
               <LoanSummaryContainer title="Summary">
                  <LoanSummary title="Health Factor" amount={`${data.healthFactor}%`} />
                  <LoanSummary title="Borrowing amount" amount={`${data.loanAmount} ${data.loanToken}`} />
                  <LoanSummary title="Your collateral" amount={`${data.collateralAmount} ${data.collateralToken}`} />
                  <LoanSummary title="Colateral rate" amount={`${150}%`} />
                  <LoanSummary title="Platform Fee" amount={`3.34 USDC`} />
                  <LoanSummary title="Amount" amount={`386.95 USDC`} />
               </LoanSummaryContainer>
            </div>
            <Button styling="py-[12px] px-6 text-[15px]" variant="solid-purple">
               Liquidate Position
            </Button>
         </div>
      </Modal>
   );
};

export default LiquidationModal;
