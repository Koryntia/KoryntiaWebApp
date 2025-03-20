import { ethers } from 'ethers';
import { useState } from "react";
import Modal from "../common/Modal";
import LoanSummaryContainer from "../create-loan/LoanSummaryContainer";
import LoanSummary from "../create-loan/LoanSummary";
import Button from "../elements/button/Button";
import { updateLoan } from '@/services/api/update-loan';
import { ILoanRequest } from "@/interfaces/loan-interface";
import { useLoanService } from '@/services/contract-services/loan-service.hook';
import { useAccount } from "wagmi";
import { DateTime } from "luxon";
import { RoundedInput } from "../elements/Input";
import Select from "../elements/select";
import MessageHandler from '@/utils/message-handler';
import { collateralAmountOptions } from "@/app/data/currency";
import { CurrencyOption } from '@/types/liquidation';

const messageHandler = MessageHandler.get();

type AddCollateralProps = {
  open: boolean;
  loanData: ILoanRequest;
  handleClose: () => void;
  action: "Add Collateral";
};

const AddCollateral = (props: AddCollateralProps) => {
  const { open, loanData, handleClose, action } = props;
  const { address } = useAccount();
  const { LoanService, isInitialized } = useLoanService();
  const [collateralAmount, setCollateralAmount] = useState(0);
  const collateralOption = collateralAmountOptions.find((option) => option.name === loanData.collateralToken);
  const foundOption = collateralAmountOptions.find(
    (option) => option.name === loanData.collateralToken
  );
  const defaultOption: CurrencyOption = foundOption ?? {
    name: loanData.collateralToken,
    value: "",
    address: "",
    image: ""
  };
  const [selectedCollateralOption, setSelectedCollateralOption] = useState<CurrencyOption>(defaultOption);

  function calculateCountdown(date: string) {
    const targetDate = DateTime.fromISO(date);
    const now = DateTime.now();
    const diff = targetDate.diff(now, ["days", "hours", "minutes", "seconds"]);
    const countdown = `${Math.floor(diff.days)}d ${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m ${Math.floor(diff.seconds)}s`;
    return countdown;
  }

  const handleCollateralOptionChange = (selectedValue: string) => {
    const selectedOption = collateralAmountOptions.find((option) => option.value === selectedValue);
    if (!selectedOption) return;
    setSelectedCollateralOption(selectedOption);
  };

  const addCollateral = async () => {
    const success = await LoanService().addCollateral(
      loanData.loanId,
      ethers.parseEther(collateralAmount.toString())
    );
    if (!success) return;

    const response: any = await updateLoan(loanData._id as string, { loanStatus: "funded" } );
    if (!response) {
      messageHandler.handleError("Failed to add collateral");
      return;
    }
    messageHandler.handleSuccess("Successfully added collateral");
  }

  return (
    <Modal showModal={open} toggleModal={handleClose}>
      <div className="w-[330px] pt-5 px-6 flex flex-col gap-6">
        <span className="text-neutral-800 text-lg font-semibold font-['Raleway'] leading-normal">
          Add Collateral
        </span>
        <hr />
        <div className="request-amount flex flex-col gap-2 relative w-full">
            <h4 className="text-textBlack text-[16px] tracking-[0.16px] leading-[20.08px] font-inter font-medium my-1">
              Collateral Amount
            </h4>
            <div className="bg-gray-100 px-2 py-4 flex rounded-2xl relative">
              <RoundedInput
                placeholder="3,000.04"
                type="number"
                value={collateralAmount}
                onChange={(e) => setCollateralAmount(Number(e.target.value))}
              />
              <div className="w-[45%] flex gap-4 justify-end self-center relative">
                <span className="h-full text-[#C3C8CA]">{"|"}</span>
                <div className="flex justify-center gap-2 items-center relative">
                  <Select
                    name="requestAmount"
                    id="requestAmount"
                    options={[collateralOption]}
                    onChange={handleCollateralOptionChange}
                  />
                </div>
              </div>
            </div>
          </div>

        <Button styling="py-[12px] px-6 text-[15px]" variant="solid-purple" onClick={addCollateral}>
          Add Collateral
        </Button>
      </div>
    </Modal>
  );
};

export default AddCollateral;
