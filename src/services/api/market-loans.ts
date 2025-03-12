import { get } from "@/services/utils";
import { ILoanRequest } from "@/interfaces/loan-interface";

export const getMarketLoans = async () => {
  return get<ILoanRequest[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/loan`).then(
    (data) => data != null ? data.data : null
  );
};

export const getMarketLoan = async (loanName: String) => {
  return get<ILoanRequest>(
    `/loan?name=` + loanName
  ).then((data) => data != null ? data.data : null);
};
