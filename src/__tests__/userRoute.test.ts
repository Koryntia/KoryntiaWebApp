/**
 * @jest-environment node
 */

import mongoose from "mongoose";
import { testApiHandler } from "next-test-api-route-handler";
import UserSignee from "@/models/user-model";
import * as appHandler from "@/app/api/user/route";
import config from "@/utils/config";

describe("POST /api/user", () => {
  beforeAll(async () => {
    const MongoURI = config.MONGODB_URI;
    if (!MongoURI) throw new Error("MongoURI is not defined");
    console.log(`Connecting to ${MongoURI}`);
    await mongoose.connect(MongoURI);
  }, 1000000);

  afterAll(async () => {
    await UserSignee.deleteMany({});
    await mongoose.connection.close();
  });

  it("should create a new user if not exists", async () => {
    const userData = { signeeWalletAddress: "0x123" };

    await testApiHandler({
      appHandler,
      url: "/api/user",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        expect(res.status).toBe(201);
        const json = await res.json();
        expect(json.message).toBe("User created successfully");
      },
    });
  }, 1000000);

  it("should return 204 if user already exists", async () => {
    const userData = { signeeWalletAddress: "0x123" };

    await testApiHandler({
      appHandler,
      url: "/api/user",
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        expect(res.status).toBe(204);
      },
    });
  }, 1000000);

  it("should return 400 if required fields are missing", async () => {
    await testApiHandler({
      appHandler,
      url: "/api/user",
      test: async ({ fetch }) => {
        // Send POST request with missing required fields
        const response = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        expect(response.status).toBe(422);
      },
    });
  }, 1000000);
});
