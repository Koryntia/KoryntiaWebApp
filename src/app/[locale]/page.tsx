'use client'
import { useState } from "react";
import CreateLoan from "../component/create-loan/create-loan";
import LoanSummaryContainer from "../component/create-loan/LoanSummaryContainer";
import LoanSummary from "../component/create-loan/LoanSummary";
import LoanButton from "../component/create-loan/LoanButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { decrement, increment } from '../../redux/features/count-slice';

export default function Home() {


  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  const [showSummary, setShowSummary] = useState<boolean>(false);

  const handleShowSummary = () => {
    return setShowSummary(prevState => !prevState)
  }

  const handleAdd = () => {
    dispatch(increment())
  }
  const handleMinus = () => {
    dispatch(decrement())
  }

  return (
    <section>
      <div className="flex w-full">
        <div className="dashboard-column-1 w-[900px] h-full">
          <h2>Right Column</h2>
          <h2>{count}</h2>
          <div>
            <button className="bg-green-300 p-2" onClick={handleAdd} >add</button> {"  "}
            <button className="bg-blue-300 p-2" onClick={handleMinus}>minus</button>
          </div>

        </div>
        <div className="dashboard-column-2 w-[330px] h-full">
          <CreateLoan />
          {
            showSummary &&
            <div>
              <LoanSummaryContainer title="Summary">
                <LoanSummary title="Borrowing amount" amount="3000,04 USDC" />
                <LoanSummary title="Your collateral" amount="2,500,50 USDC" />
                <LoanSummary title="Colateral rate" amount="120 %" />
                <LoanSummary title="Borrow Fee" amount="2.06%" />
              </LoanSummaryContainer>
              <LoanSummaryContainer title="Installment">
                <LoanSummary title="Monthly Amount" amount="1,000 USDC" />
                <LoanSummary title="Colateral rate" amount="35 %" />
                <LoanSummary title="Endorsement rate" amount="1,00 %" />
              </LoanSummaryContainer>
            </div>
          }
          <div className='w-full mt-2 mx-auto'>
            <LoanButton
              title="Calculate Position"
              showSummary={showSummary}
              setShowSummary={setShowSummary}
              handleShowSummary={handleShowSummary}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
