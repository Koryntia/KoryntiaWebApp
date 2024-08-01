import { ILoanRequest } from "@/interfaces/loan-interface";
import { post, get } from "@/services/utils";

type GetMyLoanResponse = ILoanRequest[];

export const getMyLoan = async (walletAddress: String) => {
  return get<GetMyLoanResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/loan?borrowerID=` + walletAddress
  ).then((data) => data.data);
};

export const getMySuppliedLoan = async (walletAddress: String) => {
  return get<GetMyLoanResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/loan?investorAddress=` + walletAddress
  ).then((data) => data.data);
};

export const getMyLoansByStatus = async (
  walletAddress: String,
  status: String
) => {
  return get<GetMyLoanResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/loan?borrowerId=${walletAddress}&status=${status}`
  ).then((data) => data.data);
};
