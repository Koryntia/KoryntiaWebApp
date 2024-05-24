/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import mongoose from "mongoose";
import * as appHandler from "@/app/api/new-loan/route";
import config from "@/utils/config";

describe("newLoan API route", () => {
  beforeAll(async () => {
    const MongoURI = config.MONGODB_URI;
    console.log(`Connecting to ${MongoURI}`);
    await mongoose.connect(MongoURI);
  }, 1000000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("POST /api/newLoan returns 201 for valid loan data", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const loanData = {
          userAddress: '0x123',
          loanAmount: '1000',
          loanToken: '0x1234567890',
          collateralAmount: '500',
          collateralToken: 'BTC',
          loanPeriod: new Date(Date.parse('31 Dec 2024 00:00:00 GMT')),
          loanRequestPeriod:new Date(Date.parse('30 Nov 2024 00:00:00 GMT')),
          healthFactor: '1.5',
          interestRate: '5',
          initialThreshold: '0.8',
          liquidationThreshold: '0.5',
          nftManager: 'Manager1',
          nftVersion: '1.0',
          creationDate: new Date(),
          borrowedStatus: 'pending',
          investorAddress: '0x456',
          updatedDate: new Date(),
      };      

        const response = await fetch({
          method: "POST",
          body: JSON.stringify(loanData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();

        expect(response.status).toBe(201);
        await expect(json.message).toStrictEqual("Loan created successfully.");
      },
    });
  }, 1000000);

  it("POST /api/newLoan returns 400 if required fields are missing", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const loanData = {
          userAddress: '0x123',
        };
        const response = await fetch({
          method: "POST",
          body: JSON.stringify(loanData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        expect(response.status).toBe(422);
      },
    });
  });
});