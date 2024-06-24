import { post, get } from "@/services/utils";

// export type LoanData = {
//    liquidationThreshold: number;
//    initialThreshold: number;
//    loanRepayDeadline: number;
//    loanRequestDeadline: number;
//    _id: string;
//    userAddress: string;
//    loanAmount: number;
//    loanPeriod: number;
//    loanToken: string;
//    collateralAmount: number;
//    collateralToken: string;
//    healthFactor: number;
//    platformFee: number;
//    interestRate: number;
//    __v: number;
// };
export type LoanData = {
   liquidationThreshold: string;
   initialThreshold: string;
   loanRepayDeadline: string;
   loanRequestDeadline: string;
   _id: string;
   userAddress: string;
   loanAmount: string;
   loanPeriod: string;
   loanToken: string;
   collateralAmount: string;
   collateralToken: string;
   healthFactor: string;
   platformFee: string;
   interestRate: string;
   creationDate: string;
   updatedDate: string;
   __v: number;
};

// type GetMyLoanResponse = {
//    // success: true;
//    // status: 200;
//    data: LoanData[];
// };
type GetMyLoanResponse = LoanData[];

export const getMyLoan = async (walletAddress: String) => {
   return get<GetMyLoanResponse>("/loan?borrowerID=" + walletAddress).then((data) => data.data);
};
