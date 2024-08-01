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
   loanToken: string;
   collateralToken: string;
}

const Summary = ({ borrowingAmount, collateral, collateralRate, platformFee, period, healthFactor, loanToken, collateralToken }: ISummary) => {
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

   const calculateHealth = () => {
      // uint256 collateralAdjustedThreshold = (collateralValueUsd *
      // 	liquidationThreshold) / INTEREST_PRECISION;
      // return (collateralAdjustedThreshold * PRECISION) / loanValueUsd;

      return 100;
   }

   return (
      <div className="py-3">
         <LoanSummaryContainer title="Summary">
            <LoanSummary title="Health Factor" amount={`${healthFactor.toString() || 0} ${"%"}`} />
            <LoanSummary title="Borrowing amount" amount={`${borrowingAmount.toString() || 0} ${loanToken.toUpperCase()}`} />
            <LoanSummary title="Your collateral" amount={`${Number(collateral).toFixed(4) || 0} ${collateralToken.toUpperCase()}`} />
            <LoanSummary title="Interest rate" amount={`${collateralRate.toString()}%`} />
            <LoanSummary title="Platform Fee" amount={`${platformFee.toString() || 0} ${currency}`} />
            <LoanSummary title="Period" amount={`${period.toString() || 0} ${"Year(s)"}`} />
         </LoanSummaryContainer>
      </div>
   );
};

export default Summary;
