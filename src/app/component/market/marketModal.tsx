import { AiOutlineDollarCircle } from "react-icons/ai";
import Modal from "../common/Modal";
import { useState } from "react";
import LoanSummaryContainer from "../create-loan/LoanSummaryContainer";
import LoanSummary from "../create-loan/LoanSummary";
import Button from "../elements/button/Button";

type MarketModalProps = {
  open: boolean;
  handleClose: () => void;
};

type CurrencyOption = {
  name: string;
  value: string;
};

type LoanFormProps = {
  name: string;
  value: string;
};

const collateralAmountOptions: CurrencyOption[] = [
  { name: "USDT", value: "usdt" },
  { name: "BTC", value: "btc" },
  { name: "USDC", value: "usdc" },
  { name: "ETH", value: "eth" },
  { name: "MATIC", value: "matic" },
  { name: "SOL", value: "sol" },
];

const MarketModal = (props: MarketModalProps) => {
  const { open, handleClose } = props;
  const [selectedCollateralAmountOptions, setSelectedCollateralAmountOption] =
    useState<CurrencyOption | null>(null);
  const [collateralAmount, setCollateralAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("1");

  const [loanPeriodValue, setLoanPeriodValue] = useState<LoanFormProps[]>([
    { name: "1 Year", value: "1" },
    { name: "2 Years", value: "2" },
    { name: "3 Years", value: "3" },
    { name: "4 Years", value: "4" },
  ]);

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
    <Modal showModal={open} toggleModal={handleClose}>
      <div className="w-[330px] pt-5 px-6 flex flex-col gap-6">
        <span className="text-neutral-800 text-lg font-semibold font-['Raleway'] leading-normal">
          Supply Loan position
        </span>
        <div className="request-amount flex flex-col gap-2 relative w-full mt-[10px]">
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
        </div>
        <hr />
        <div className="py-3">
          <LoanSummaryContainer title="Summary">
            <LoanSummary title="Health Factor" amount={`40  ${"%"}`} />
            <LoanSummary title="Borrowing amount" amount={`3000,04 USDC`} />
            <LoanSummary title="Your collateral" amount={`2,500,50 USDC`} />
            <LoanSummary title="Colateral rate" amount={`${150}%`} />
            <LoanSummary title="Platform Fee" amount={`3.34 USDC`} />
            <LoanSummary title="Amount" amount={`386.95 USDC`} />
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
