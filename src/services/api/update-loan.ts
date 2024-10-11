import { UpdateLoanDto } from "@/services/DTOs/LoanUpdate";
import { put } from "../utils";

export const updateLoan = async (loanId: string, loanData: UpdateLoanDto) => {
  return await put(
    `${process.env.NEXT_PUBLIC_BASE_URL}/update-loan/${loanId}`,
    JSON.stringify(loanData)
  );
};
