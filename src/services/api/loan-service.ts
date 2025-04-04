import { LoanRequestDto } from "../DTOs/LoanRequest";
import { post } from "../utils";

export const createNewLoan = async (loanData: LoanRequestDto) => {
  return await post(
    `/new-loan`,
    JSON.stringify(loanData)
  );
};
