export interface ILoanRequest {
   _id: string;
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
   borrowedStatus: string;
   investorAddress: string;
   updatedDate: Date;
   createdAt: Date;
   updatedAt: Date;
   name: string;
}
