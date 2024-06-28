// loan.dto.ts
import { IsString, IsNumber, IsDate, IsEnum, IsOptional, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { AtLeastOneField } from "../validators/ATLeastOneField";

enum BorrowedStatus {
   new = "new",
   invested = "invested",
   closed = "closed",
}

export class UpdateLoanDto {
   @AtLeastOneField(
      [
         "userAddress",
         "loanAmount",
         "collateralAmount",
         "collateralToken",
         "loanPeriod",
         "loanRequestPeriod",
         "healthFactor",
         "interestRate",
         "initialThreshold",
         "liquidationThreshold",
         "nftManager",
         "nftVersion",
         "borrowedStatus",
         "investorAddress",
         "loanToken",
      ],
      { message: "At least one field other than loanToken must be provided" }
   )
   someField: any;

   @IsOptional()
   @IsString()
   loanToken: string;

   @IsString()
   @IsOptional()
   userAddress?: string;

   @IsNumber()
   @IsOptional()
   loanAmount?: number;

   @IsString()
   @IsOptional()
   collateralAmount?: string;

   @IsString()
   @IsOptional()
   collateralToken?: string;

   @IsDate()
   @IsOptional()
   @Type(() => Date)
   loanPeriod?: Date;

   @IsDate()
   @IsOptional()
   @Type(() => Date)
   loanRequestPeriod?: Date;

   @IsString()
   @IsOptional()
   healthFactor?: string;

   @IsString()
   @IsOptional()
   interestRate?: string;

   @IsString()
   @IsOptional()
   initialThreshold?: string;

   @IsString()
   @IsOptional()
   liquidationThreshold?: string;

   @IsString()
   @IsOptional()
   nftManager?: string;

   @IsString()
   @IsOptional()
   nftVersion?: string;

   @IsEnum(BorrowedStatus)
   @IsOptional()
   borrowedStatus?: BorrowedStatus;

   @IsString()
   @IsOptional()
   investorAddress?: string;

   @IsOptional()
   @IsString()
   name: string;
}
