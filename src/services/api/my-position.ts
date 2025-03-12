import { ILoanRequest } from "@/interfaces/loan-interface";
import { post, get } from "@/services/utils";

type GetMyLoanResponse = ILoanRequest[];

export const getMyLoan = async (walletAddress: String) => {
  return get<GetMyLoanResponse>(
    `/loan?borrowerID=` + walletAddress
  ).then((data) => data != null ? data.data : null);
};

export const getMySuppliedLoan = async (walletAddress: String) => {
  return get<GetMyLoanResponse>(
    `/loan?investorAddress=` + walletAddress
  ).then((data) => data != null ? data.data : null);
};

export const getMyLoansByStatus = async (
  walletAddress: String,
  status: String
) => {
  return get<GetMyLoanResponse>(
    `/loan?borrowerId=${walletAddress}&status=${status}`
  ).then((data) => data != null ? data.data : null);
};
