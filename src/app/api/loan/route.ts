import { NextResponse } from "next/server";
import LoanModel from "@/models/loan-model";
import { validateOrReject } from "class-validator";
import { plainToClass } from "class-transformer";
import { GetLoanDto } from "@/services/DTOs/LoanGet";
import connectDB from "@/lib/db";

export async function GET(req: Request) {
   const url = new URL(req.url);
   const query = {
      borrowerID: url.searchParams.get("borrowerID"),
      investorAddress: url.searchParams.get("investorAddress"),
      loanToken: url.searchParams.get("loanToken"),
      status: url.searchParams.get("status"),
   };

   try {
      await connectDB();

      try {
         const getLoanDto = plainToClass(GetLoanDto, query);
         await validateOrReject(getLoanDto);
      } catch (error) {
         console.error("Validation error", error);
         return NextResponse.json({ error }, { status: 422 });
      }

      const filter: any = {};

      if (query.borrowerID) {
         filter.userAddress = query.borrowerID;
      }
      if (query.investorAddress) {
         filter.investorAddress = query.investorAddress;
      }
      if (query.loanToken) {
         filter.loanToken = query.loanToken;
      }
      if (query.status) {
         filter.borrowedStatus = query.status;
      }

      const loans = await LoanModel.find(filter);
      return NextResponse.json(loans, { status: 200 });
   } catch (errors) {
      console.error("Unexpected error", errors);
      return NextResponse.json({ message: "Validation failed", errors }, { status: 400 });
   }
}
