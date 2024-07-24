import LoanSummary from "./LoanSummary";
import LoanSummaryContainer from "./LoanSummaryContainer";
import { useState } from "react";

interface ISummary {
   borrowingAmount: string;
   collateral?: string;
   collateralRate: string;
   platformFee: string;
   period: string;
   healthFactor: string;
}

const Summary = ({ borrowingAmount, collateral, collateralRate, platformFee, period, healthFactor }: ISummary) => {
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

   const currency = "USDC";
   const borrow = 11;
   // const collateralRate = 1.2;
   // const collateral = borrow * collateralRate;
   // const months = 12;
   return (
      <div className="py-3">
         <LoanSummaryContainer title="Summary">
            <LoanSummary title="Health Factor" amount={`${healthFactor.toString() || 0} ${"%"}`} />
            <LoanSummary title="Borrowing amount" amount={`${borrowingAmount.toString() || 0} ${currency}`} />
            <LoanSummary title="Your collateral" amount={`${collateral?.toString() || 0} ${currency}`} />
            <LoanSummary title="Colateral rate" amount={`${3}%`} />
            <LoanSummary title="Platform Fee" amount={`${platformFee.toString() || 0} ${currency}`} />
            <LoanSummary title="Period" amount={`${period.toString() || 0} ${"Year(s)"}`} />
         </LoanSummaryContainer>
      </div>
   );
};

export default Summary;
