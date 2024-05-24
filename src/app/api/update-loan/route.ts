import 'reflect-metadata';

import { NextResponse } from 'next/server';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import LoanModel from '@/models/loan-model';
import { UpdateLoanDto } from '@/services/DTOs/LoanUpdate';

export async function PUT (req: Request) {
  if (req.method === 'PUT') {
    try {
      const data = await req.json();

      try {
        const updateLoanDto = plainToClass(UpdateLoanDto, data);
        await validateOrReject(updateLoanDto);
      } catch (error) {
        console.error('Validation error', error);
        return NextResponse.json({ error }, { status: 422 });
      }

      const loan = await LoanModel.findOne({ loanToken: data.loanToken });

      if (!loan) {
        return NextResponse.json({ message: `The loan with the address ${data.loanToken} doesn't exist` }, { status: 404});
      }

      if (loan.borrowedStatus === 'borrowed' && data.borrowedStatus === 'borrowed') {
        return NextResponse.json({ message: 'This Loan is already borrowed' }, { status: 409});
      }

      Object.assign(loan, data);
      await loan.save();

      return NextResponse.json(loan, { status: 200});
    } catch (errors) {
      return NextResponse.json({ message: 'Validation failed', errors }, { status: 400 });
    }
  } else {
    const response = NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
    response.headers.set('Allow', 'PUT');
    response.headers.set('Content-Type', 'application/json');
    return response;
  }
};