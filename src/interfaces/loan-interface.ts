export interface ILoanRequest {
  userAddress: string;
  loanAmount: string;
  loanToken: string;
  collateralAmount: string;
  collateralToken: string;
  loanPeriod: Date;
  loanRequestPeriod:Date;
  healthFactor: string;
  platformFee: string;
  interestRate: string;
  initialThreshold:string;
  liquidationThreshold:string;
  nftManager:string;
  nftVersion:string;
  healtFactor:string;
  crationDate: Date;
}
