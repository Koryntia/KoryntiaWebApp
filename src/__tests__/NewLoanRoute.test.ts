/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import mongoose from "mongoose";
import LoanModel from "@/models/loan-model";
import * as appHandler from "@/app/api/new-loan/route";
import config from "@/utils/config";

describe("newLoan API route", () => {
  beforeAll(async () => {
    const MongoURI = config.MONGODB_URI;
    console.log(`Connecting to ${MongoURI}`);
    await mongoose.connect(MongoURI as string);
  }, 1000000);

  afterAll(async () => {
    await LoanModel.deleteMany({});
    await mongoose.connection.close();
  });

  it("POST /api/newLoan returns 201 for valid loan data", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const loanData = {
          userAddress: "0x123",
          loanAmount: "1000",
          loanToken: "0x1234567890",
          collateralAmount: "500",
          collateralToken: "BTC",
          loanPeriod: new Date(Date.parse("31 Dec 2024 00:00:00 GMT")),
          loanRequestPeriod: new Date(Date.parse("30 Nov 2024 00:00:00 GMT")),
          healthFactor: "1.5",
          interestRate: "5",
          initialThreshold: "0.8",
          liquidationThreshold: "0.5",
          nftManager: "Manager1",
          nftVersion: "1.0",
          creationDate: new Date(),
          borrowedStatus: "new",
          investorAddress: "0x456",
          updatedDate: new Date(),
          imageUrl: "https://example.com/image.jpg",
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
        expect(json.message).toStrictEqual("Loan created successfully.");
      },
    });
  }, 1000000);

  it("POST /api/newLoan returns 201 for valid loan data", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const loanData = {
          userAddress: "0x123",
          loanAmount: "1000",
          loanToken: "0x1234567890",
          collateralAmount: "500",
          collateralToken: "BTC",
          loanPeriod: new Date(Date.parse("31 Dec 2024 00:00:00 GMT")),
          loanRequestPeriod: new Date(Date.parse("30 Nov 2024 00:00:00 GMT")),
          healthFactor: "1.5",
          interestRate: "5",
          initialThreshold: "0.8",
          liquidationThreshold: "0.5",
          nftManager: "Manager1",
          nftVersion: "1.0",
          creationDate: new Date(),
          borrowedStatus: "new",
          investorAddress: "0x456",
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
        expect(json.message).toStrictEqual("Loan created successfully.");
        expect(json.data.imageUrl).not.toBe(undefined);
      },
    });
  }, 1000000);

  it("POST /api/newLoan returns 422 if required fields are missing", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const loanData = {
          userAddress: "0x123",
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

  it("POST /api/newLoan returns 422 for invalid data types", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const loanData = {
          userAddress: "0x123",
          loanAmount: "invalidAmount", // Invalid loan amount
          loanToken: "0x6574839201",
          collateralAmount: "500",
          collateralToken: "BTC",
          loanPeriod: "invalidDate", // Invalid date
          loanRequestPeriod: new Date(Date.parse("30 Nov 2024 00:00:00 GMT")),
          healthFactor: "1.5",
          interestRate: "5",
          initialThreshold: "0.8",
          liquidationThreshold: "0.5",
          nftManager: "Manager1",
          nftVersion: "1.0",
          creationDate: new Date(),
          borrowedStatus: "new",
          investorAddress: "0x456",
          updatedDate: new Date(),
          imageUrl: "https://example.com/image.jpg",
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

  it("POST /api/newLoan returns 422 for invalid status", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const loanData = {
          userAddress: "0x123",
          loanAmount: "1000",
          loanToken: "0x1234567890",
          collateralAmount: "500",
          collateralToken: "BTC",
          loanPeriod: new Date(Date.parse("31 Dec 2024 00:00:00 GMT")),
          loanRequestPeriod: new Date(Date.parse("30 Nov 2024 00:00:00 GMT")),
          healthFactor: "1.5",
          interestRate: "5",
          initialThreshold: "0.8",
          liquidationThreshold: "0.5",
          nftManager: "Manager1",
          nftVersion: "1.0",
          creationDate: new Date(),
          borrowedStatus: "pending",
          investorAddress: "0x456",
          updatedDate: new Date(),
          imageUrl: "https://example.com/image.jpg",
        };

        const response = await fetch({
          method: "POST",
          body: JSON.stringify(loanData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();

        expect(response.status).toBe(422);
      },
    });
  }, 1000000);

  it("POST /api/newLoan handles boundary values correctly", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const loanData = {
          userAddress: "0x123",
          loanAmount: "0", // Boundary value
          loanToken: "0x1029384756",
          collateralAmount: "0", // Boundary value
          collateralToken: "BTC",
          loanPeriod: new Date(Date.parse("31 Dec 2024 00:00:00 GMT")),
          loanRequestPeriod: new Date(Date.parse("30 Nov 2024 00:00:00 GMT")),
          healthFactor: "0", // Boundary value
          interestRate: "0", // Boundary value
          initialThreshold: "0", // Boundary value
          liquidationThreshold: "0", // Boundary value
          nftManager: "Manager1",
          nftVersion: "1.0",
          creationDate: new Date(),
          borrowedStatus: "new",
          investorAddress: "0x456",
          updatedDate: new Date(),
          imageUrl: "https://example.com/image.jpg",
        };

        const response = await fetch({
          method: "POST",
          body: JSON.stringify(loanData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        expect(response.status).toBe(201);

        const res = await response.json();
        expect(res.message).toBe("Loan created successfully.");
      },
    });
  });

  it("POST /api/newLoan handles edge cases", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const loanData = {
          userAddress: "0x123",
          loanAmount: "1000000000000000", // Very large value
          loanToken: "0x0987654321",
          collateralAmount: "1000000000000000", // Very large value
          collateralToken: "BTC",
          loanPeriod: new Date(Date.parse("31 Dec 3000 00:00:00 GMT")), // Far future date
          loanRequestPeriod: new Date(Date.parse("30 Nov 3000 00:00:00 GMT")), // Far future date
          healthFactor: "1000000000", // Very large value
          interestRate: "1000000000", // Very large value
          initialThreshold: "1000000000", // Very large value
          liquidationThreshold: "1000000000", // Very large value
          nftManager: "Manager1",
          nftVersion: "1.0",
          creationDate: new Date(),
          borrowedStatus: "new",
          investorAddress: "0x456",
          updatedDate: new Date(),
          imageUrl: "https://example.com/image.jpg",
        };

        const response = await fetch({
          method: "POST",
          body: JSON.stringify(loanData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const res = await response.json();
        expect(response.status).toBe(201);
        expect(res.message).toBe("Loan created successfully.");
        expect(res.data.healthFactor).toBe("1000000000");
      },
    });
  });
});
