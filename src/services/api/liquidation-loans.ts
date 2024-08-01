import { get } from "@/services/utils";
import { ILoanRequest } from "@/interfaces/loan-interface";

export const getLiquidationLoans = async () => {
  return get<ILoanRequest[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/liquidateable-loan`
  ).then((data) => data.data);
};
