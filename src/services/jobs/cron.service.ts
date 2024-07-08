import { CronJob } from "cron";
import mongoose, { Document } from "mongoose";
import LoanModel from "@/models/loan-model";
import { ILoanRequest } from "@/interfaces/loan-interface";
import config from "@/utils/config";
import { getTokenPrice } from "@/utils/getPrice"; // Adjust the import path as needed

interface ILoanDocument extends ILoanRequest, Document {}

const calculateHealthFactorJob = new CronJob(
  "0 0 * * *",
  async () => {
    try {
      await mongoose.connect(config.MONGODB_URI as string);

      const loans: ILoanDocument[] = await LoanModel.find({});

      for (const loan of loans) {
        try {
          const loanAmount = parseFloat(loan.loanAmount);
          const interestRate = parseFloat(loan.interestRate);
          const liquidationThreshold = parseFloat(loan.liquidationThreshold);
          const collateralAmount = parseFloat(loan.collateralAmount);

          const loanTokenPrice = await getTokenPrice(loan.loanToken);
          const collateralTokenPrice = await getTokenPrice(loan.loanToken);

          const collateralValue = collateralAmount * collateralTokenPrice;
          const loanValue = loanAmount * loanTokenPrice;

          const debtAmount = loanValue * (1 + interestRate);

          const healthFactor =
            (collateralValue * liquidationThreshold) / debtAmount;

          loan.healthFactor = healthFactor.toFixed(2);
          await loan.save();
        } catch (error) {
          console.error(`Error processing loan with ID ${loan._id}:`, error);
        }
      }

      await mongoose.connection.close();
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  },
  null,
  true,
  "UTC",
);

calculateHealthFactorJob.start();
