import { LoanRequestDto } from "../DTOs/LoanRequest";
import { post } from "../utils";

export const createNewLoan = async (loanData: LoanRequestDto) => {
  return await post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/new-loan`,
    JSON.stringify(loanData)
  );
};
