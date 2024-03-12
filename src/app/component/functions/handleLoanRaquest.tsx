// import CreateLoanRequest from "./createLoanRequest";

// //as this is the info from the form for testing the values are hardcoded
// const handleLoanRequest = ()=>{

//   const loanToken = "0x41aF19fb4495eF9D62fB0bccfa2C482A61F97851";// here supose to be the type of currency of the loan

//   const collateralToken= "0x41aF19fb4495eF9D62fB0bccfa2C482A61F97851";//here supose to be the type of currency of the collateral
//   //sepolia  testnet 0x41aF19fb4495eF9D62fB0bccfa2C482A61F97851 https://sepolia.etherscan.io/address/0x41aF19fb4495eF9D62fB0bccfa2C482A61F97851

//   const collateralAmount= BigInt(90000000000000000); // Here is the collateral Amount expressed in wei

//   const liquidationThreshold= 1; // It is necessary to enter a number between 1 and 9999 t
//   // this represents 00,01% and 99,99%

//   const initialThreshold= 150; // It is necessary to enter a number between 1 and 9999 t
//   // this represents 00,01% and 99,99%

//   const loanRepayDeadline= BigInt(1734003270000)	; // this is the date of the payment expiration  selected by the user
//   //12 of Dicember 2024 12:34 30'' 30'''

//     const loanRequestDeadline= 	BigInt(1705059270000); // this is the date the unborrowed token expires
//   // 12 of junuary 2024 12:34 30'' 30'''  1 month

//   const interestRate = 3000; //  // It is necessary to enter a number between 1 and 9999 t
//   // this represents 00,01% and 99,99%

//   if (loanToken!== undefined && loanToken.length >0){
//     return <CreateLoanRequest
//      loanToken= {loanToken}
//       collateralToken={collateralToken}
//       collateralAmount={collateralAmount}
//       liquidationThreshold={liquidationThreshold}
//       initialThreshold ={initialThreshold}
//       loanRepayDeadline ={loanRepayDeadline}
//       loanRequestDeadline={loanRequestDeadline}
//       interestRate ={interestRate}
//     />
//   }
//  }

// export default handleLoanRequest;
