export interface ILoan {
  userAddress: string;
  loanAmount: number;
  loanToken: string;
  collateralAmount: number;
  collateralToken: string;
  loanPeriod: number;
  healthFactor: number;
  platformFee: number;
  interestRate: number;
}
