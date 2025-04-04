import { get } from "@/services/utils";
import { ILoanRequest,STATUS } from "@/interfaces/loan-interface";

export const getMarketLoans = async (): Promise<ILoanRequest[] | null> => {
  return get<ILoanRequest[]>("/loan").then((data) => {
    const loans = data?.data ?? null;
    if (!loans) return null;
    return loans.filter((loan) =>
      [STATUS.requested, STATUS.funded, STATUS.unhealthy].includes(loan.loanStatus)
    );
  });
};

export const getMarketLoan = async (loanName: string): Promise<ILoanRequest | null> => {
  return get<ILoanRequest>("/loan?name=" + loanName).then(
    (data) => data?.data ?? null
  );
};
