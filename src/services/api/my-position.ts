import { ILoanRequest } from "@/interfaces/loan-interface";
import { post, get } from "@/services/utils";

export type LoanData = {
  _id: string;
  name: string;
  liquidationThreshold: string;
  initialThreshold: string;
  loanRepayDeadline: string;
  loanRequestDeadline: string;
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
type GetMyLoanResponse = ILoanRequest[];

export const getMyLoan = async (walletAddress: String) => {
  return get<GetMyLoanResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/loan?borrowerID=` + walletAddress
  ).then((data) => data.data);
};

export const getMySuppliedLoan = async (walletAddress: String) => {
  return get<GetMyLoanResponse>("/loan?investorAddress=" + walletAddress).then(
    (data) => data.data
  );
};

export const getMyLoansByStatus = async (
  walletAddress: String,
  status: String
) => {
  return get<GetMyLoanResponse>(
    `/loan?borrowerId=${walletAddress}&status=${status}`
  ).then((data) => data.data);
};
