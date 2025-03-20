export interface ILoanRequest {
  _id?: string;
  loanId: Number;
  userAddress: string;
  loanAmount: string;
  loanToken: string;
  collateralAmount: string;
  collateralToken: string;
  loanPeriod: Date;
  loanRequestPeriod: Date;
  healthFactor: string;
  interestRate: string;
  initialThreshold: string;
  liquidationThreshold: string;
  nftManager: string;
  nftVersion: string;
  creationDate: Date;
  loanStatus: STATUS;
  investorAddress: string;
  updatedDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
}

export enum STATUS {
  "requested" = "requested",
  "withdrawn" = "withdrawn",
  "funded" = "funded",
  "paid" = "paid",
  "expired" = "expired",
  "unhealthy" = "unhealthy",
  "liquidated" = "liquidated",
}
