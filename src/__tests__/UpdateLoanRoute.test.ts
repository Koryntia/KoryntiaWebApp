/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import mongoose from "mongoose";
import * as appHandler from "@/app/api/update-loan/route";
import LoanModel from "@/models/loan-model";
import config from "@/utils/config";

describe("PUT /api/loan", () => {
  beforeAll(async () => {
    const MongoURI = config.MONGODB_URI;
    console.log(`Connecting to ${MongoURI}`);
    await mongoose.connect(MongoURI);
  }, 1000000);

  afterAll(async () => {
    await LoanModel.deleteMany({});
    await mongoose.connection.close();
  });

  it("should update a loan if it is new", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const loanData = {
          userAddress: '0x123',
          loanAmount: 1000,
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
          borrowedStatus: 'new',
          investorAddress: '0x456',
          updatedDate: new Date(),
        };
        
        const loan = new LoanModel(loanData);
        await loan.save();

        const updateData = {
          loanToken: '0x1234567890',
          borrowedStatus: 'invested',
          investorAddress: '0x456',
        };

        const response = await fetch({
          method: "PUT",
          body: JSON.stringify(updateData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json.borrowedStatus).toBe('invested');
        expect(json.investorAddress).toBe('0x456');
      },
    });
  });

  it("should return 404 if loan does not exist", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const updateData = {
          loanToken: 'nonexistent',
          borrowedStatus: 'invested',
          investorAddress: '0x456',
        };

        const response = await fetch({
          method: "PUT",
          body: JSON.stringify(updateData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        expect(response.status).toBe(404);
        const json = await response.json();
        expect(json.message).toBe(`The loan with the address nonexistent doesn't exist`);
      },
    });
  });

  it("should return 409 if loan is already borrowed", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const updateData = {
          loanToken: '0x1234567890',
          borrowedStatus: 'invested',
          investorAddress: '0x456',
        };

        const response = await fetch({
          method: "PUT",
          body: JSON.stringify(updateData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        expect(response.status).toBe(409);
        const json = await response.json();
        expect(json.message).toBe('This Loan is already borrowed');
      },
    });
  });

  it("should return 422 if required fields are missing", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "PUT",
          body: JSON.stringify({ loanToken: '0x1234567890' }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        expect(response.status).toBe(422);
      },
    });
  });
});
