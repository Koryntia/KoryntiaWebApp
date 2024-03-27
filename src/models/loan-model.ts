import { ILoan } from "@/interfaces/loan-interface";
import { Document, Schema, model } from "mongoose";

const loanSchema = new Schema<ILoan>({
  userAddress: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  loanPeriod: { type: Number, required: true },
  loanToken: { type: String, required: true },
  collateralAmount: { type: Number, required: true },
  collateralToken: { type: String, required: true },
  healthFactor: { type: Number, required: true },
  platformFee: { type: Number, required: true },
  interestRate: { type: Number, required: true },
});

const loan_model = model<ILoan>("loan_model", loanSchema);

export default loan_model;
