export interface ILoan {
    userAddress: string;
    loanToken: string;
    collateralToken: string;
    collateralAmount: number;
    liquidationThreshold: number;
    initialThreshold: number;
    loanRepayDeadline: number;
    loanRequestDeadline: number;
    interestRate: number;
}