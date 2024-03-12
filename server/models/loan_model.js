

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loanModelSchema = new Schema(
    {
        userAddress: { type: String, required: true },
        loanToken: { type: String, required: true },
        collateralToken: { type: String, required: true },
        collateralAmount: { type: Number, required: true },
        liquidationThreshold: { type: Number, default: 0 },
        initialThreshold: { type: Number, default: 0 },
        loanRepayDeadline: { type: Number, default: 0 },
        loanRequestDeadline: { type: Number, default : 0 },
        interestRate: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);
const loan_model = mongoose.model("loan_model", loanModelSchema);
module.exports = loan_model;



const loanSchema = new Schema(
    {
        userAddress: { type: String, required: true },
        loanToken: { type: String, required: true },
        collateralToken: { type: String, required: true },
        collateralAmount: { type: Number, required: true },
        liquidationThreshold: { type: Number, default: 0 },
        initialThreshold: { type: Number, default: 0 },
        loanRepayDeadline: { type: Number, default: 0 },
        loanRequestDeadline: { type: Number, default : 0 },
        interestRate: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);
