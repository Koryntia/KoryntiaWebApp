import CreateLoan from "./component/CreateLoan/CreateLoan";
import LoanButton from "./component/CreateLoan/LoanButton";
import LoanSummary from "./component/CreateLoan/LoanSummary";

export default function Home() {
  return (
    <section>
      <div className="flex w-full">
        <div className="dashboard-column-1 w-[900px] h-full">
          <h2>right Column</h2>
        </div>
        <div className="dashboard-column-2 w-[330px] h-full">
          <CreateLoan />
          <div className='w-[278px] mx-auto '>
            <h3 className='text-textBlack font-bold leading-[23.4px] my-2'>Summary</h3>
            <LoanSummary title="Borrowing amount" amount="3000,04 USDC" />
            <LoanSummary title="Your collateral" amount="2,500,50 USDC" />
            <LoanSummary title="Colateral rate" amount="120 %" />
            <LoanSummary title="Borrow Fee" amount="2.06%" />
          </div>
          <div className='w-[278px] h-[119px] mx-auto'>
            <h3 className='text-textBlack font-bold leading-[23.4px] my-2'>Installment</h3>
            <LoanSummary title="Monthly Amount" amount="1,000 USDC" />
            <LoanSummary title="Colateral rate" amount="35 %" />
            <LoanSummary title="Endorsement rate" amount="1,00 %" />
          </div>
          <div className='w-[278px] mx-auto'>
            <LoanButton title="Calculate Position" />
          </div>
        </div>
      </div>
    </section>
  )
}
