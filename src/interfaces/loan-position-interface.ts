import { ethers } from 'ethers';

export interface ILoanPosition {
  borrowerAddress: string;
  lenderAddress: string;
  loanToken: string,
  collateralToken: string,
  loanAmount: ethers.BigNumberish,
  collateralAmount: ethers.BigNumberish,
  liquidationThreshold: ethers.BigNumberish,
  initialThreshold: ethers.BigNumberish,
  loanRepayDeadline: ethers.BigNumberish,
  loanRequestDeadline: ethers.BigNumberish,
  interestRate: ethers.BigNumberish,
}