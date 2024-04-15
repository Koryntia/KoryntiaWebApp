import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/db";
import LoanModel from "@/models/loan-model";

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.userAddress) {
    return NextResponse.json(
      { status: 400, message: "User wallet address is required" },
      // { status: 400 }
    );
  }
  if (!body) {
    return NextResponse.json(
      { status: 400, message: "Please provide loan details" },
      // { status: 400 }
    );
  }
  await connectDB();
  try {
    const newLoan = new LoanModel(body);
    await newLoan.save();
    return NextResponse.json(
      { status: 201, message: "Successfully created a Loan", data: newLoan },
      // { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Server Error: Failed to create Loan" },
      // { status: 500 }
    );
  }
}
