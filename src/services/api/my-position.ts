import { ILoanRequest } from "@/interfaces/loan-interface";
import { post, get } from "@/services/utils";
import config from '@/utils/config';

type GetMyLoanResponse = ILoanRequest[];

export const getMyLoan = async (walletAddress: String) => {
  return get<GetMyLoanResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/loan?borrowerID=` + walletAddress
  ).then((data) => data != null ? data.data : null);
};

export const getMySuppliedLoan = async (walletAddress: String) => {
  return get<GetMyLoanResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/loan?investorAddress=` + walletAddress
  ).then((data) => data != null ? data.data : null);
};

export const getMyLoansByStatus = async (
  walletAddress: String,
  status: String
) => {
  return get<GetMyLoanResponse>(
    `${config.BASE_URL}/loan?borrowerId=${walletAddress}&status=${status}`
  ).then((data) => data != null ? data.data : null);
};
