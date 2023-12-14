
import LoanSummary from "./LoanSummary"
import LoanSummaryContainer from "./LoanSummaryContainer"
import { useState } from "react";

const Summary= ()=>{
   
    return(
    <div className="py-5
    ">
      <LoanSummaryContainer title="Summary">
        <LoanSummary title="Borrowing amount" amount="3000,04 USDC" />
        <LoanSummary title="Your collateral" amount="2,500,50 USDC" />
        <LoanSummary title="Colateral rate" amount="120 %" />
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