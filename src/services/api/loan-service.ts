// import { baseUrl } from "@/shared/constant";
import { LoanRequestDto } from "../DTOs/LoanRequest";
import { post } from "../utils";

// const createNewLoan = async (loanData: any) => {
//    try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/new-loan`, {
//          method: "POST",
//          headers: {
//             "Content-Type": "application/json",
//          },
//          body: JSON.stringify(loanData),
//       });
//       const newLoan = await response.json();
//       return newLoan;
//    } catch (error) {
//       console.log("Failed creating new loan, api/loan: ", error);
//       return { error };
//    }
// };

// export { createNewLoan };

export const createNewLoan = async (loanData: LoanRequestDto) => {
  return await post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/new-loan`,
    JSON.stringify(loanData)
  );
};
