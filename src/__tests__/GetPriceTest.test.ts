/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "@/app/api/get-price/route";
import config from "@/utils/config";

describe("GET /api/get-price", () => {
  beforeAll(async () => {
    const MongoURI = config.MONGODB_URI;
    const Contract = config.ORACLE_CONTRACT_ADDRESS;
    const RPC_URL = config.RPC_URL;
    if (!MongoURI) throw new Error("MongoURI is not defined");
    if (!Contract) throw new Error("Oracle Contract is not defined");
    if (!RPC_URL) throw new Error("RPC URL is not defined");
  }, 100000);

  it("should return the price of BTC/USD", async () => {
    await testApiHandler({
      appHandler,
      url: "/api/get-price?tokenPair=BTC/USD",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.price).toBeGreaterThan(0);
        console.log(json);
      },
    });
  });

  it("should return the price of ETH/USD", async () => {
    await testApiHandler({
      appHandler,
      url: "/api/get-price?tokenPair=ETH/USD",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.price).toBeGreaterThan(0);
        console.log(json);
      },
    });
  });

  it("should return the price of LINK/USD", async () => {
    await testApiHandler({
      appHandler,
      url: "/api/get-price?tokenPair=LINK/USD",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.price).toBeGreaterThan(0);
        console.log(json.price);
      },
    });
  });
});
