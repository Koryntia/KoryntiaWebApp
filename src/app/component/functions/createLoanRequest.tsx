// import {
//   useContractWrite,
//   usePrepareContractWrite,
//   useWaitForTransaction,
// } from "wagmi";
// import LoanPositionManagerAbi from "../../../abis/loanPositionManager";
// import { Address } from "wagmi";
// import { FC } from "react";

// //this is the function that creates the loan. Request this must be tested once
// //we have the administrator account

// interface pageProps {
//   loanToken: Address;
//   collateralToken: Address;
//   collateralAmount: BigInt;
//   liquidationThreshold: number;
//   initialThreshold: number;
//   loanRepayDeadline: BigInt;
//   loanRequestDeadline: BigInt;
//   interestRate: number;
// }

// const CreateLoanRequest: FC<pageProps> = ({
//   loanToken,
//   collateralToken,
//   collateralAmount,
//   liquidationThreshold,
//   initialThreshold,
//   loanRepayDeadline,
//   loanRequestDeadline,
//   interestRate,
// }) => {
//   // if (loanToken.length && collateralToken.length) {
//   //   const {
//   //     config,
//   //     error: prepareError,
//   //     isError: isPrepareError,
//   //   } = usePrepareContractWrite({
//   //     address: "0x4D080A303646fe3B8CDAdb9eB929148F9fCc5D6D", //this is the old contract
//   //     abi: LoanPositionManagerAbi,
//   //     functionName: "createLoanPosition",
//   //     args: [
//   //       loanToken,
//   //       collateralToken,
//   //       collateralAmount,
//   //       liquidationThreshold,
//   //       initialThreshold,
//   //       loanRepayDeadline,
//   //       loanRequestDeadline,
//   //       interestRate,
//   //     ],
//   //   });
//   //   const { data, error, isError, write } = useContractWrite(config);
//   //   const { isLoading, isSuccess } = useWaitForTransaction({
//   //     hash: data?.hash,
//   //   });
//   //   return (
//   //     <div>
//   //       <button onClick={() => write?.()}>
//   //         {isLoading ? "creando..." : "creado"}
//   //       </button>
//   //       {isSuccess && (
//   //         <div>
//   //           <div>
//   //             <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
//   //           </div>
//   //         </div>
//   //       )}
//   //       {(isPrepareError || isError) && (
//   //         <div>Error: {(prepareError || error)?.message}</div>
//   //       )}
//   //     </div>
//   //   );
//   // }

//   const {
//     config,
//     error: prepareError,
//     isError: isPrepareError,
//   } = usePrepareContractWrite({
//     address: "0x4D080A303646fe3B8CDAdb9eB929148F9fCc5D6D", //this is the old contract
//     abi: LoanPositionManagerAbi,
//     functionName: "createLoanPosition",
//     args: [
//       loanToken,
//       collateralToken,
//       collateralAmount,
//       liquidationThreshold,
//       initialThreshold,
//       loanRepayDeadline,
//       loanRequestDeadline,
//       interestRate,
//     ],
//   });

//   const { data, error, isError, write } = useContractWrite(config);
//   const { isLoading, isSuccess } = useWaitForTransaction({
//     hash: data?.hash,
//   });

//   if (!loanToken.length || !collateralToken.length) {
//     return (
//       <div>
//         <div>Error: Missing loanToken or collateralToken</div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <button onClick={() => write?.()}>
//         {isLoading ? "creando..." : "creado"}
//       </button>
//       {isSuccess && (
//         <div>
//           <div>
//             <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
//           </div>
//         </div>
//       )}
//       {(isPrepareError || isError) && (
//         <div>Error: {(prepareError || error)?.message}</div>
//       )}
//     </div>
//   );
// };
// export default CreateLoanRequest;

import React from "react";

const CreateLoanRequest = () => {
  return <div>createLoanRequest</div>;
};

export default CreateLoanRequest;
