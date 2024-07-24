import { NextResponse } from "next/server";
import LoanModel from "@/models/loan-model";
import { LoanRequestDto } from "@/services/DTOs/LoanRequest";
import { ILoanRequest } from "@/interfaces/loan-interface";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

export async function POST(req: Request) {
   try {
      const data: ILoanRequest = await req.json();

      try {
         const loanRequestDto = plainToInstance(LoanRequestDto, data);
         await validateOrReject(loanRequestDto);
      } catch (error) {
         console.error("Validation error", error);
         return NextResponse.json({ error }, { status: 422 });
      }

      const existingLoan = await LoanModel.findOne({ loanToken: data.loanToken });
      if (existingLoan) {
         return NextResponse.json({
            status: 409,
            message: "Loan with the provided loanToken already exists.",
         });
      }

      const formattedLoanPeriod: Date = new Date(data.loanPeriod);
      const formattedLoanRequestPeriod: Date = new Date(data.loanRequestPeriod);

      const newLoan = new LoanModel({
         ...data,
         loanPeriod: formattedLoanPeriod,
         loanRequestPeriod: formattedLoanRequestPeriod,
      });

      const result = await newLoan.save();
      return NextResponse.json({
         status: 201,
         message: "Loan created successfully.",
         data: result,
      });
   } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({
         status: 500,
         message: "Internal server error.",
      });
   }
}
