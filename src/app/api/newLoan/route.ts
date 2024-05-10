import { NextResponse, NextRequest } from 'next/server';
import LoanModel from '@/models/loan-model';

interface LoanRequest {
    userAddress: string;
    loanAmount: string;
    loanToken: string;
    collateralAmount: string;
    collateralToken: string;
    loanPeriod: string;
    loanRequestPeriod: string;
    healthFactor: string;
    platformFee: string;
    interestRate: string;
    initialThreshold: string;
    liquidationThreshold: string;
    nftManager: string;
    nftVersion: string;
}

export async function POST(request: NextRequest) {
    try {
        const {
            userAddress,
            loanAmount,
            loanToken,
            collateralAmount,
            collateralToken,
            loanPeriod,
            loanRequestPeriod,
            healthFactor,
            platformFee,
            interestRate,
            initialThreshold,
            liquidationThreshold,
            nftManager,
            nftVersion,
        }: LoanRequest = await request.json();

        if (!userAddress) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: Wallet Address is required.',
            });
        }

        if (!loanAmount) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: Loan Amount is required.',
            });
        }

        if (!loanToken) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: Loan Token is required.',
            });
        }

        if (!collateralAmount) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: Collateral Amount is required.',
            });
        }

        if (!collateralToken) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: Collateral Token is required.',
            });
        }

        if (!loanPeriod) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: Loan Period is required.',
            });
        }

        if (!loanRequestPeriod) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: Loan Request Period is required.',
            });
        }

        if (!healthFactor) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: Health Factor is required.',
            });
        }

        if (!platformFee) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: Platform Fee is required.',
            });
        }

        if (!interestRate) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: Interest Rate is required.',
            });
        }

        if (!initialThreshold) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: Initial Threshold is required.',
            });
        }

        if (!liquidationThreshold) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: Liquidation Threshold is required.',
            });
        }

        if (!nftManager) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: NFT Manager is required.',
            });
        }

        if (!nftVersion) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: NFT Version is required.',
            });
        }

        if (!healthFactor) {
            return NextResponse.json({
                status: 400,
                message: 'ERROR: Health Factor is required.',
            });
        }

        const formattedLoanPeriod = new Date(loanPeriod);
        const formattedLoanRequestPeriod = new Date(loanRequestPeriod);

        const newLoan = new LoanModel({
            userAddress,
            loanAmount,
            loanToken,
            collateralAmount,
            collateralToken,
            loanPeriod: formattedLoanPeriod,
            loanRequestPeriod: formattedLoanRequestPeriod,
            healthFactor,
            platformFee,
            interestRate,
            initialThreshold,
            liquidationThreshold,
            nftManager,
            nftVersion,
        });


        await newLoan.save();
        return NextResponse.json({
            status: 201,
            message: 'Loan created successfully.',
            data: newLoan,
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            status: 500,
            message: 'Internal server error.',
        });
    }
}






