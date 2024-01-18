import { NextResponse, NextRequest } from "next/server";
import connectDatabase from "@/lib/database";
import LoanModel from "@/models/loan-model";

export async function POST(request: NextRequest) {

    const body = await request.json();
    if (!body.userAddress) {
        return NextResponse.json({ message: "User wallet address is required" }, { status: 400 });
    }
    if (!body) {
        return NextResponse.json({ message: "Please provide loan details" }, { status: 400 });
    }
    await connectDatabase();
    try {
        const newLoan = new LoanModel(body)
        await newLoan.save();
        return NextResponse.json({ message: "Successfully created a Loan", data: newLoan }, { status: 201 });
    } catch (error) {
        console.log("Create Loan Error: ", error);
        return NextResponse.json({ message: "Server Error: Failed to create Loan" }, { status: 500 });
    }
}

