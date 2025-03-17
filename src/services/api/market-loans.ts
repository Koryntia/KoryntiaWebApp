import { get } from "@/services/utils";
import { ILoanRequest } from "@/interfaces/loan-interface";

export const getMarketLoans = async (): Promise<ILoanRequest[] | null> => {
  return get<ILoanRequest[]>("/loan").then(
    (data) => data?.data ?? null
  );
};

export const getMarketLoan = async (loanName: string): Promise<ILoanRequest | null> => {
  return get<ILoanRequest>("/loan?name=" + loanName).then(
    (data) => data?.data ?? null
  );
};
