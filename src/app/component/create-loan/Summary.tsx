
import LoanSummary from "./LoanSummary"
import LoanSummaryContainer from "./LoanSummaryContainer"
import { useState } from "react";


const Summary= ()=>{
  // the inputs are from create loan forms
  //is needed to call the contract for this step 
  /*function calculateDebtAmount(
        address collateralToken,
        uint256 collateralAmount,
        address loanToken,
        uint256 initialThreshold
    )  
We do not have the criteria to use to make these calculations.
    */
  

  const currency = "ETH"
   const borrow = 11;
   const collateralRate = 1.2;
   const collateral = borrow * collateralRate;
   const months = 12;

    return(
    <div className="py-5
    ">
      <LoanSummaryContainer title="Summary">
        <LoanSummary title="Borrowing amount" amount={`${borrow.toString()} ${currency}`} />
        <LoanSummary title="Your collateral" amount={`${collateral.toString()} ${currency}`}/>
        <LoanSummary title="Colateral rate" amount={`${(collateralRate *100).toString()}%`} />
        <LoanSummary title="Borrow Fee" amount="2.06%" />
      </LoanSummaryContainer>
       <LoanSummaryContainer  title="Installment" >
       <LoanSummary title="Monthly Amount" amount="1,000 USDC" />
        <LoanSummary title="Colateral rate" amount="35 %" />
        <LoanSummary title="Endorsement rate" amount="1,00 %" />
       </LoanSummaryContainer>
    </div>
    )

  }

  export default Summary