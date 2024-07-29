import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsEnum,
  IsOptional,
} from "class-validator";
import { ILoanRequest, STATUS } from "@/interfaces/loan-interface";

enum BorrowedStatus {
  new = "new",
  invested = "invested",
  closed = "closed",
}

export class LoanRequestDto implements ILoanRequest {
  @IsNotEmpty({ message: "User address is required." })
  @IsString()
  userAddress: string;

  @IsNotEmpty({ message: "Loan amount is required." })
  @IsString()
  loanAmount: string;

  @IsNotEmpty({ message: "Loan token is required." })
  @IsString()
  loanToken: string;

  @IsNotEmpty({ message: "Collateral amount is required." })
  @IsString()
  collateralAmount: string;

  @IsNotEmpty({ message: "Collateral token is required." })
  @IsString()
  collateralToken: string;

  @IsNotEmpty({ message: "Loan period is required." })
  @IsDateString()
  loanPeriod: Date;

  @IsNotEmpty({ message: "Loan request period is required." })
  @IsDateString()
  loanRequestPeriod: Date;

  @IsNotEmpty({ message: "Health factor is required." })
  @IsString()
  healthFactor: string;

  @IsNotEmpty({ message: "Interest rate is required." })
  @IsString()
  interestRate: string;

  @IsNotEmpty({ message: "Initial threshold is required." })
  @IsString()
  initialThreshold: string;

  @IsNotEmpty({ message: "Liquidation threshold is required." })
  @IsString()
  liquidationThreshold: string;

  @IsNotEmpty({ message: "NFT manager is required." })
  @IsString()
  nftManager: string;

  @IsNotEmpty({ message: "NFT version is required." })
  @IsString()
  nftVersion: string;

  @IsNotEmpty({ message: "Loan status is required." })
  @IsEnum(STATUS)
  loanStatus: STATUS;

  @IsNotEmpty({ message: "Investor Address is required." })
  @IsString()
  investorAddress: string;

  @IsNotEmpty({ message: "Creation Date is required." })
  @IsDateString()
  creationDate: Date;

  @IsNotEmpty({ message: "Updated date is required." })
  @IsDateString()
  updatedDate: Date;

  @IsOptional()
  @IsString()
  _id: string;

  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsDateString()
  updatedAt: Date;

  @IsOptional()
  @IsString()
  name: string;
}
