import { Document, Schema, model } from "mongoose";
import { ILoanRequest } from "@/interfaces/loan-interface";

const loanSchema = new Schema<ILoanRequest>({
  userAddress: { type: String, required: true },
  loanAmount: { type: String, required: true },
  loanToken: { type: String, required: true },
  collateralAmount: { type: String, required: true },
  collateralToken: { type: String, required: true },
  loanPeriod: { type: Date, required: true },
  loanRequestPeriod:{ type: Date, required: true },
  healthFactor: { type: String, required: true },
  interestRate: { type: String, required: true },
  initialThreshold:{ type: String, required: true },
  liquidationThreshold:{ type: String, required: true },
  nftManager:{ type: String, required: true },
  nftVersion:{ type: String, required: true },
  creationDate: { type: Date, required: true },
  borrowedStatus:{type: String, default:'new', required: true},
  investorAddress:{type:String, required:false},
  updatedDate:{type:Date, required: false},
  name: { type: String, required: false }
}, {
  timestamps: true,
});

const LoanModel = model<ILoanRequest>("LoanModel", loanSchema);

export default LoanModel;
