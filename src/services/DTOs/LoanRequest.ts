import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ILoanRequest } from "@/interfaces/loan-interface";

export class LoanRequestDto implements ILoanRequest {
    @IsNotEmpty({ message: 'User address is required.' })
    @IsString()
    userAddress: string;

    @IsNotEmpty({ message: 'Loan amount is required.' })
    @IsString()
    loanAmount: string;

    @IsNotEmpty({ message: 'Loan token is required.' })
    @IsString()
    loanToken: string;

    @IsNotEmpty({ message: 'Collateral amount is required.' })
    @IsString()
    collateralAmount: string;

    @IsNotEmpty({ message: 'Collateral token is required.' })
    @IsString()
    collateralToken: string;

    @IsNotEmpty({ message: 'Loan period is required.' })
    @IsDateString()
    loanPeriod: Date;

    @IsNotEmpty({ message: 'Loan request period is required.' })
    @IsDateString()
    loanRequestPeriod: Date;

    @IsNotEmpty({ message: 'Health factor is required.' })
    @IsString()
    healthFactor: string;

    @IsNotEmpty({ message: 'Interest rate is required.' })
    @IsString()
    interestRate: string;

    @IsNotEmpty({ message: 'Initial threshold is required.' })
    @IsString()
    initialThreshold: string;

    @IsNotEmpty({ message: 'Liquidation threshold is required.' })
    @IsString()
    liquidationThreshold: string;

    @IsNotEmpty({ message: 'NFT manager is required.' })
    @IsString()
    nftManager: string;

    @IsNotEmpty({ message: 'NFT version is required.' })
    @IsString()
    nftVersion: string;

    @IsNotEmpty({ message: 'Borrowed status is required.' })
    @IsString()
    borrowedStatus: string;

    @IsNotEmpty({ message: 'Investor Address is required.' })
    @IsString()
    investorAddress: string;

    @IsNotEmpty({ message: 'Creation Date is required.' })
    @IsDateString()
    creationDate: Date;

    @IsNotEmpty({ message: 'Updated date is required.' })
    @IsDateString()
    updatedDate: Date;

    constructor(
        userAddress: string,
        loanAmount: string,
        loanToken: string,
        collateralAmount: string,
        collateralToken: string,
        loanPeriod: Date,
        loanRequestPeriod: Date,
        healthFactor: string,
        interestRate: string,
        initialThreshold: string,
        liquidationThreshold: string,
        nftManager: string,
        nftVersion: string,
        creationDate: Date,
        borrowedStatus: string,
        investorAddress: string,
        updatedDate: Date
    ) {
        this.userAddress = userAddress;
        this.loanAmount = loanAmount;
        this.loanToken = loanToken;
        this.collateralAmount = collateralAmount;
        this.collateralToken = collateralToken;
        this.loanPeriod = loanPeriod;
        this.loanRequestPeriod = loanRequestPeriod;
        this.healthFactor = healthFactor;
        this.interestRate = interestRate;
        this.initialThreshold = initialThreshold;
        this.liquidationThreshold = liquidationThreshold;
        this.nftManager = nftManager;
        this.nftVersion = nftVersion;
        this.creationDate = creationDate;
        this.borrowedStatus = borrowedStatus;
        this.investorAddress = investorAddress;
        this.updatedDate = updatedDate;
    }
}