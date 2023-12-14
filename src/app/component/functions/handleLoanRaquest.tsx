
import CreateLoanRequest from "./createLoanRequest";
import { Address } from "viem";

//as this is the info from the form for testing the values are hardcoded 
const handleLoanRequest = (address:Address | undefined)=>{
  const loanToken = address;
  const collateralToken= "0x22C1317FE43132b22860e8b465548613d6151a9F";
  //sepolia  testnet 0x22C1317FE43132b22860e8b465548613d6151a9F
  const collateralAmount= 960000000000000000; // 
  const liquidationThreshold= 1;
  const initialThreshold= 150;
  const loanRepayDeadline= 	1734003270000; // this is the date of the payment expiration  selected by the user
  //12 of Dicember 2024 12:34 30'' 30'''
  const loanRequestDeadline= 	1705059270000; // this is the date the unborrowed token expires 
  // 12 of junuary 2024 12:34 30'' 30'''  1 month
  const interestRate = 3000; // %3
  if (loanToken!== undefined && loanToken.length >0){
    return <CreateLoanRequest
     loanToken= {loanToken} 
      collateralToken={collateralToken}  
      collateralAmount={collateralAmount} 
      liquidationThreshold={liquidationThreshold}
      initialThreshold ={initialThreshold} 
      loanRepayDeadline ={loanRepayDeadline} 
      loanRequestDeadline={loanRequestDeadline} 
      interestRate ={interestRate}
    />
  }
 }

export default handleLoanRequest;
