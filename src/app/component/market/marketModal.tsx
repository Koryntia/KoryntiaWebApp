import Modal from "../common/Modal";
import LoanSummaryContainer from "../create-loan/LoanSummaryContainer";
import LoanSummary from "../create-loan/LoanSummary";
import Button from "../elements/button/Button";
import { updateLoan } from '@/services/api/update-loan';
import { ILoanRequest } from "@/interfaces/loan-interface";
import { useLoanService } from '@/services/contract-services/loan-service.hook';
import { useAccount } from "wagmi";
import { DateTime } from "luxon";
import MessageHandler from '@/utils/message-handler';

const messageHandler = MessageHandler.get();

type MarketModalProps = {
  open: boolean;
  loanData: ILoanRequest;
  handleClose: () => void;
  action: "Request" | "Withdraw" | "Repay" | "Liquidate";
};


const MarketModal = (props: MarketModalProps) => {
  const { open, loanData, handleClose, action } = props;
  const { address } = useAccount();
  const { LoanService, isInitialized } = useLoanService();

  function calculateCountdown(date: string) {
    const targetDate = DateTime.fromISO(date);
    const now = DateTime.now();
    const diff = targetDate.diff(now, ["days", "hours", "minutes", "seconds"]);
    const countdown = `${Math.floor(diff.days)}d ${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m ${Math.floor(diff.seconds)}s`;
    return countdown;
  }

  const actionHandler: { [key: string]: () => Promise<void> } = {
    Supply: async () => {
      const success = await LoanService().fundLoan(loanData.loanId);
      if (!success) return;

      const response: any = await updateLoan(loanData._id as string, { investorAddress: address, loanStatus: "funded" } );
      if (!response) {
        messageHandler.handleError("Failed to fund loan");
        return;
      }
      messageHandler.handleSuccess("Successfully funded loan");
    },

    Repay: async () => {
      console.log('Repaying...');
      const success = await LoanService().repay(loanData.loanId);
      if (!success) return;

      const response: any = await updateLoan(loanData._id as string, { loanStatus: "paid" } );
      if (!response) {
        messageHandler.handleError("Failed to repay loan");
        return;
      }
      messageHandler.handleSuccess("Successfully repaid loan");
    },

    Withdraw: async () => {
      const success = await LoanService().withdrawCollateral(loanData.loanId);
      if (!success) return;

      const response: any = await updateLoan(loanData._id as string, { loanStatus: "withdrawn" } );
      if (!response) {
        messageHandler.handleError("Failed to withdraw loan");
        return;
      }
      messageHandler.handleSuccess("Successfully withdraw loan");
    },

    Liquidate: async () => {
      const success = await LoanService().liquidate(loanData.loanId);
      if (!success) return;

      const response: any = await updateLoan(loanData._id as string, { loanStatus: "liquidated" } );
      if (!response) {
        messageHandler.handleError("Failed to liquidate loan");
        return;
      }
      messageHandler.handleSuccess("Successfully liquidate loan");
    },
  };

  return (
    <Modal showModal={open} toggleModal={handleClose}>
      <div className="w-[330px] pt-5 px-6 flex flex-col gap-6">
        <span className="text-neutral-800 text-lg font-semibold font-['Raleway'] leading-normal">
          {`${action} Loan position`}
        </span>
        <hr />
        <div className="py-3">
          <LoanSummaryContainer title="Summary">
            <LoanSummary title="Health Factor" amount={`${loanData.healthFactor}`} />
            <LoanSummary title="Borrowing amount" amount={`${loanData.loanAmount} ${loanData.loanToken}`} />
            <LoanSummary title="Loan collateral" amount={`${Number(loanData.collateralAmount).toFixed(4)} ${loanData.collateralToken}`} />
            <LoanSummary title="Interest rate" amount={`${loanData.interestRate}%`} />
            <LoanSummary title="Platform Fee" amount={`3.34 USDC`} />
            <LoanSummary title="Loan Period" amount={`${calculateCountdown(loanData.loanPeriod.toString())}`} />
          </LoanSummaryContainer>
        </div>

        <Button styling="py-[12px] px-6 text-[15px]" variant="solid-purple" onClick={actionHandler[action]}>
          {`${action} Loan`}
        </Button>
      </div>
    </Modal>
  );
};

export default MarketModal;
