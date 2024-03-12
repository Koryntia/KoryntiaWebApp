import { post } from "@/services/utils";

export type LoanData = {
  liquidationThreshold: number;
  initialThreshold: number;
  loanRepayDeadline: number;
  loanRequestDeadline: number;
  _id: string;
  userAddress: string;
  loanAmount: number;
  loanPeriod: number;
  loanToken: string;
  collateralAmount: number;
  collateralToken: string;
  healthFactor: number;
  platformFee: number;
  interestRate: number;
  __v: number;
};

type GetMyLoanResponse = {
  success: true;
  status: 200;
  data: LoanData[];
};

export const getMyLoan = async (wallet_address: `0x${string}` | undefined) => {
  return post<GetMyLoanResponse>("/getMyLoan", {
    wallet_address: wallet_address,
  }).then((data) => data.data?.data);
};
