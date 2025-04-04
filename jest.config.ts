import type { Config } from 'jest';
import nextJest from 'next/jest';
import path from 'path';
import { config as loadEnv } from 'dotenv';

loadEnv({
  path: path.resolve(process.cwd(), '.env.local')
});

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jest-environment-jsdom",
  modulePaths: ["<rootDir>/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testTimeout: 10000000,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], 
};

export default createJestConfig(config);
