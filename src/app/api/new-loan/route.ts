import { NextResponse } from 'next/server';
import LoanModel from '@/models/loan-model';
import { LoanRequestDto } from "@/services/DTOs/LoanRequest";
import { ILoanRequest } from "@/interfaces/loan-interface";
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export async function POST(req: Request) {
    try {
        const data: ILoanRequest = await req.json();

        try {
            const loanRequestDto = plainToInstance(LoanRequestDto, data);
            await validateOrReject(loanRequestDto);
        } catch (error) {
            console.error('Validation error', error);
            return NextResponse.json({ error }, { status: 422 });
        }

        const existingLoan = await LoanModel.findOne({ loanToken: data.loanToken });
        if (existingLoan) {
            return NextResponse.json({
                message: 'Loan with the provided loanToken already exists.',
            }, { status: 409 });
        }

        const formattedLoanPeriod: Date = new Date(data.loanPeriod);
        const formattedLoanRequestPeriod: Date = new Date(data.loanRequestPeriod);

        const newLoan = new LoanModel({ ...data, loanPeriod: formattedLoanPeriod, loanRequestPeriod: formattedLoanRequestPeriod });

        const result = await newLoan.save();
        return NextResponse.json({
            message: 'Loan created successfully.',
            data: result,
        }, { status: 201 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            message: 'Internal server error.',
        }, { status: 500 });
    }
}