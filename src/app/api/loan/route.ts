import { NextResponse, NextRequest } from 'next/server';
import LoanModel from '@/models/loan-model';
import { ERRORS } from '../../../constant/index';

interface LoanRequest {
    loanToken?: string;
    userAddress?: string;
    investorAddress?: string;
    borrowedStatus?: string;
}

export async function PUT(request: NextRequest) {
    try {
        const body: LoanRequest = await request.json();

        if (!body.loanToken || !body.borrowedStatus || !body.investorAddress) {
            return NextResponse.json({
                status: 400,
                message: 'You must provide at least one allowed field in the request',
            });
        }

        const data = await LoanModel.findOne({ loanToken: body.loanToken });

        if (!data) {
            return NextResponse.json({
                status: 404,
                message: `The loan with the address ${body.loanToken} doesn't exist`,
            });
        }

        if (data.borrowedStatus === 'unborrowed') {
            data.borrowedStatus = 'borrowed';
            data.investortAddress = body.investorAddress;
            data.updatedDate = new Date();
            await data.save();
            return NextResponse.json({ data }, { status: 200 });
        }

        if (data.borrowedStatus === 'borrowed') {
            return NextResponse.json({
                status: 409,
                message: 'This Loan is already borrowed',
            });
        }

        return NextResponse.json({
            status: 500,
            message: 'Server Error: Failed to borrow the loan',
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: ERRORS.REQUIRED.WALLETADDRESS_REQUIRED,
        });
    }
}
