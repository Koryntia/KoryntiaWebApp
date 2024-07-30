import { get } from "@/services/utils";

export type LoanData = {
  _id: string;
  userAddress: string;
  loanToken: string;
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
// type GetRecentLoanResponse = {
//    //   success: boolean;
//    //   status: number;
//    data: LoanData[];
// };

// export const getRecentLoan = async () =>
//   get<GetRecentLoanResponse>("/getRecentLoan").then((data) => data.data?.data);

export const getRecentLoan = async (walletAddress: String) => {
  return get<GetRecentLoanResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/loan?borrowerID=` + walletAddress
  ).then((data) => {
    return data.data;
  });
};
