import { get } from "@/services/utils";
import { ILoanRequest } from "@/interfaces/loan-interface";

export const getLiquidationLoans = async () => {
   return get<ILoanRequest[]>("/liquidateable-loan").then((data) => data.data);
};
