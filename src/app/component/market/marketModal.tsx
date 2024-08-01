import Modal from "../common/Modal";
import LoanSummaryContainer from "../create-loan/LoanSummaryContainer";
import LoanSummary from "../create-loan/LoanSummary";
import Button from "../elements/button/Button";
import { ILoanRequest } from "@/interfaces/loan-interface";
import { DateTime } from "luxon";

type MarketModalProps = {
  open: boolean;
  loanData: ILoanRequest;
  handleClose: () => void;
};


const MarketModal = (props: MarketModalProps) => {
  const { open, loanData, handleClose } = props;

  function calculateCountdown(date: string) {
    const targetDate = DateTime.fromISO(date);
    const now = DateTime.now();
    const diff = targetDate.diff(now, ["days", "hours", "minutes", "seconds"]);
    const countdown = `${Math.floor(diff.days)}d ${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m ${Math.floor(diff.seconds)}s`;
    return countdown;
  }

  return (
    <Modal showModal={open} toggleModal={handleClose}>
      <div className="w-[330px] pt-5 px-6 flex flex-col gap-6">
        <span className="text-neutral-800 text-lg font-semibold font-['Raleway'] leading-normal">
          Supply Loan position
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
        <Button styling="py-[12px] px-6 text-[15px]" variant="solid-purple">
          Supply Loan
        </Button>
      </div>
    </Modal>
  );
};

export default MarketModal;
