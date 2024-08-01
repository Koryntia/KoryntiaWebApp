import { STATUS } from "@/interfaces/loan-interface";
import { IsString, IsOptional, IsEnum } from "class-validator";

export class GetLoanDto {
  @IsString()
  @IsOptional()
  borrowerID?: string;

  @IsString()
  @IsOptional()
  investorAddress?: string;

  @IsString()
  @IsOptional()
  loanToken?: string;

  @IsEnum(STATUS)
  @IsOptional()
  status?: STATUS;

  @IsString()
  @IsOptional()
  loanName?: string;
}
