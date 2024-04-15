import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/db";
import LoanModel from "@/models/loan-model";

export async function GET() {
    await connectDB();
    try {
        let data = await LoanModel.find();
        return NextResponse.json({ data: data}, { status: 201 });
    } catch (error) {
        console.log("Get Loan Error: ", error);
        return NextResponse.json({ message: "Server Error: Failed to get Loan" }, { status: 500 });
    }
}
