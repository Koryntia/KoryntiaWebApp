import { get } from "@/services/utils";

export type LoanData = {
  _id: string;
  userAddress: string;
  loanToken: string;
  loanAmount: string;
  collateralToken: string;
  collateralAmount: number;
  liquidationThreshold: number;
  initialThreshold: number;
  loanRepayDeadline: number;
  loanRequestDeadline: number;
  interestRate: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type GetRecentLoanResponse = LoanData[];

export const getRecentLoan = async (walletAddress: String) => {
  return get<GetRecentLoanResponse>(
    `/loan?borrowerID=` + walletAddress
  ).then((data) => {
    return data != null ? data.data : null;
  });
};
