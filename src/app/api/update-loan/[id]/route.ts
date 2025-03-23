import "reflect-metadata";
import { NextResponse } from "next/server";
import { validateOrReject } from "class-validator";
import { plainToClass } from "class-transformer";
import LoanModel from "@/models/loan-model";
import { UpdateLoanDto } from "@/services/DTOs/LoanUpdate";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  if (req.method === "PUT") {
    try {
      const data = await req.json();

      try {
        const updateLoanDto = plainToClass(UpdateLoanDto, data);
        await validateOrReject(updateLoanDto);
      } catch (error) {
        return NextResponse.json({ error }, { status: 422 });
      }

      const numericLoanId = parseInt(id, 10);
      if (isNaN(numericLoanId)) {
        return NextResponse.json({ message: "Invalid loanId" }, { status: 400 });
      }

      const loan = await LoanModel.findOne({ loanId: numericLoanId });
      if (!loan) {
        return NextResponse.json({ message: `The loan with the id ${id} doesn't exist` }, { status: 404 });
      }

      if (loan.loanStatus === "invested" && data.loanStatus === "invested") {
        return NextResponse.json({ message: "This Loan is already invested" }, { status: 409 });
      }

      Object.assign(loan, data);
      await loan.save();

      return NextResponse.json(loan, { status: 200 });
    } catch (errors) {
      return NextResponse.json({ message: "Validation failed", errors }, { status: 400 });
    }
  } else {
    const response = NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
    response.headers.set("Allow", "PUT");
    response.headers.set("Content-Type", "application/json");
    return response;
  }
}
