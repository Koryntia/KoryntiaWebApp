import { ILoan } from "@/interfaces/loan-interface";
import { Document, Schema, model } from 'mongoose';

const loanSchema = new Schema<ILoan>({
    userAddress: { type: String, required: true },
    loanToken: { type: String, required: true },
    collateralToken: { type: String, required: true },
    collateralAmount: { type: Number, required: true },
    liquidationThreshold: { type: Number, required: true },
    initialThreshold: { type: Number, required: true },
    loanRepayDeadline: { type: Number, required: true },
    loanRequestDeadline: { type: Number, required: true },
    interestRate: { type: Number, required: true },
});

const LoanModel = model<ILoan>('Loan', loanSchema);

export default LoanModel;