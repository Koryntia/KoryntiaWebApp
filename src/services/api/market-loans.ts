import { get } from "@/services/utils";
import { ILoanRequest } from "@/interfaces/loan-interface";

export const getMarketLoans = async () => {
   return get<ILoanRequest[]>("/loan").then((data) => data.data);
};
