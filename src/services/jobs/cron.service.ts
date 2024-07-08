import { CronJob } from "cron";
import mongoose, { Document } from "mongoose";
import LoanModel from "@/models/loan-model";
import { ILoanRequest } from "@/interfaces/loan-interface";
import config from "@/utils/config";

interface ILoanDocument extends ILoanRequest, Document {}

const calculateHealthFactorJob = new CronJob(
  "0 0 * * *",
  async () => {
    try {
      const url = config.MONGODB_URI;
      if (!url) throw new Error("MongoDB URI is not defined");
      await mongoose.connect(url);

      // Retrieve all loans
      const loans: ILoanDocument[] = await LoanModel.find({});

      loans.forEach(async (loan: ILoanDocument) => {
        // Calculate debt amount
        const loanAmount = parseFloat(loan.loanAmount);
        const interestRate = parseFloat(loan.interestRate);
        const collateralAmount = parseFloat(loan.collateralAmount);
        const debtAmount = loanAmount * (1 + interestRate);

        // Calculate health factor
        const healthFactor =
          (collateralAmount * parseFloat(loan.liquidationThreshold)) /
          debtAmount;

        // Update loan with new health factor
        loan.healthFactor = healthFactor.toFixed(2); // Assuming you want to store health factor with 2 decimal places
        await loan.save();
      });

      await mongoose.connection.close();
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  },
  null,
  true,
  "UTC"
);

calculateHealthFactorJob.start();
