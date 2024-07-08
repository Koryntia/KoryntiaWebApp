// import { createLoanAction } from "@/app/_action";
import { Input } from "@/app/component/elements/Input";
import { TLoan } from "@/models/loan";

const emptyData: TLoan = {
  name: "",
  borrowerAddress: "",
  collateralAmount: "",
  collateralToken: "",
  loanAmount: "",
  loanToken: "",
  loanRepayDeadline: new Date(),
  initialThreshold: "",
  interestRate: "",
  liquidationThreshold: "",
  lenderAddress: "",
  loanRequestDeadline: new Date(),
  managerNFT: "",
  managerNFTVersion: "",
};

export default function LoanForm() {
  async function action(data: FormData) {
    "use server";
    let _data: TLoan = emptyData;
    data.forEach((value, key) => (_data = { ..._data, [key]: value }));
    // await createLoanAction({ params: _data, path: "/loans" });
  }

  return (
    <form
      action={action}
      key={Math.random()}
      className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center my-16"
    >
      <Input name="collateralAmount" placeholder="Collateral Amount" />
      <Input name="collateralToken" placeholder="Collateral Token" />
      <Input name="loanAmount" placeholder="Loan Amount" />
      <Input name="loanToken" placeholder="Loan Token" />
      <div className="flex gap-2">
        <label htmlFor="loanRepayDeadline">Loan Repay Deadline</label>
        <Input name="loanRepayDeadline" placeholder="Loan Repay Deadline" />
      </div>
      <div className="flex gap-2">
        <label htmlFor="loanRequestDeadline">Loan Request Deadline</label>
        <Input name="loanRequestDeadline" placeholder="Loan Request Deadline" />
      </div>
      <Input name="initialThreshold" placeholder="Initial Threshold" />
      <Input name="interestRate" placeholder="Interest Rate" />
      <Input name="liquidationThreshold" placeholder="Liquidation Threshold" />
      <Input name="borrowerAddress" placeholder="Borrower Address" />
      <Input name="lenderAddress" placeholder="Lender Address" />
      <Input name="managerNFT" placeholder="Manager NFT" />
      <Input name="managerNFTVersion" placeholder="Manager NFT Version" />

      <button className="px-4 py-1 text-white rounded bg-green-500">Add</button>
    </form>
  );
}
