import { IsString, IsOptional, IsEnum } from 'class-validator';

enum BorrowedStatus {
  Pending = 'pending',
  Borrowed = 'borrowed'
}

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

  @IsEnum(BorrowedStatus)
  @IsOptional()
  status?: BorrowedStatus;
}
