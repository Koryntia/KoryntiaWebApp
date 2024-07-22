/**
 * @jest-environment node
 */

import mongoose from "mongoose";
import { testApiHandler } from "next-test-api-route-handler";
import LoanModel from "@/models/loan-model";
import * as appHandler from "@/app/api/loan/route";
import config from "@/utils/config";

describe("GET /api/loan", () => {
  beforeAll(async () => {
    const MongoURI = config.MONGODB_URI;
    if (!MongoURI) throw new Error("MongoURI is not defined");
    console.log(`Connecting to ${MongoURI}`);
    await mongoose.connect(MongoURI);

    await LoanModel.create([
      {
        loanToken: "token1",
        userAddress: "0x123",
        investorAddress: "0xabc",
        borrowedStatus: "pending",
        loanAmount: 1000,
        collateralAmount: 500,
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
        updatedDate: new Date(),
      },
      {
        loanToken: "token2",
        userAddress: "0x456",
        investorAddress: "0xdef",
        borrowedStatus: "borrowed",
        loanAmount: 2000,
        collateralAmount: 1000,
        collateralToken: "ETH",
        loanPeriod: new Date(Date.parse("31 Dec 2025 00:00:00 GMT")),
        loanRequestPeriod: new Date(Date.parse("30 Nov 2025 00:00:00 GMT")),
        healthFactor: "2.0",
        interestRate: "4",
        initialThreshold: "0.7",
        liquidationThreshold: "0.4",
        nftManager: "Manager2",
        nftVersion: "2.0",
        creationDate: new Date(),
        updatedDate: new Date(),
      },
    ]);
  }, 100000);

  afterAll(async () => {
    await LoanModel.deleteMany({});
    await mongoose.connection.close();
  });

  it("should return all loans when no filters are applied", async () => {
    await testApiHandler({
      appHandler,
      url: "/api/loan",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.length).toBe(2);
      },
    });
  });

  it("should filter loans by borrowerID", async () => {
    await testApiHandler({
      appHandler,
      url: "/api/loan?borrowerID=0x123",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.length).toBe(1);
        expect(json[0].userAddress).toBe("0x123");
      },
    });
  });

  it("should filter loans by investorAddress", async () => {
    await testApiHandler({
      appHandler,
      url: "/api/loan?investorAddress=0xdef",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.length).toBe(1);
        expect(json[0].investorAddress).toBe("0xdef");
      },
    });
  });

  it("should filter loans by loanToken", async () => {
    await testApiHandler({
      appHandler,
      url: "/api/loan?loanToken=token1",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.length).toBe(1);
        expect(json[0].loanToken).toBe("token1");
      },
    });
  });

  it("should filter loans by status", async () => {
    await testApiHandler({
      appHandler,
      url: "/api/loan?status=pending",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.length).toBe(1);
        expect(json[0].borrowedStatus).toBe("pending");
      },
    });
  });

  it("should return validation error for invalid status", async () => {
    await testApiHandler({
      appHandler,
      url: "/api/loan?status=invalidstatus",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        expect(res.status).toBe(422);
        const json = await res.json();
      },
    });
  });

  it("should filter loans by multiple parameters", async () => {
    await testApiHandler({
      appHandler,
      url: "/api/loan?borrowerID=0x123&investorAddress=0xabc",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.length).toBe(1);
        expect(json[0].userAddress).toBe("0x123");
        expect(json[0].investorAddress).toBe("0xabc");
      },
    });
  });

  it("should return empty array if no loans match the filters", async () => {
    await testApiHandler({
      appHandler,
      url: "/api/loan?borrowerID=0xnonexistent",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.length).toBe(0);
      },
    });
  });

  it("should return empty array when database is empty", async () => {
    await LoanModel.deleteMany({});

    await testApiHandler({
      appHandler,
      url: "/api/loan",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.length).toBe(0);
      },
    });
  });
});
