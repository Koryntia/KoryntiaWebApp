/**
 * @jest-environment node
 */

import mongoose from 'mongoose';
import { testApiHandler } from 'next-test-api-route-handler';
import LoanModel from '@/models/loan-model';
import * as appHandler from '@/app/api/liquidateable-loan/route';
import config from '@/utils/config';

describe('GET /api/update-loan/[id]', () => {
  beforeAll(async () => {
    const MongoURI = config.MONGODB_URI;
    console.log(`Connecting to ${MongoURI}`);
    await mongoose.connect(MongoURI);
  });

  afterAll(async () => {
    await LoanModel.deleteMany({});
    await mongoose.connection.close();
  });

  it('should return loans ready for liquidation', async () => {
    // Insert test loans
    const testLoans = [
      {
        loanToken: 'token1',
        userAddress: '0x123',
        investorAddress: '0xabc',
        borrowedStatus: 'pending',
        loanAmount: 1000,
        collateralAmount: 500,
        collateralToken: 'BTC',
        loanPeriod: new Date(Date.parse('31 Dec 2025 00:00:00 GMT')),
        loanRequestPeriod: new Date(Date.parse('30 Nov 2025 00:00:00 GMT')),
        healthFactor: '0.8',
        interestRate: '5',
        initialThreshold: '0.8',
        liquidationThreshold: '0.5',
        nftManager: 'Manager1',
        nftVersion: '1.0',
        creationDate: new Date(),
        updatedDate: new Date(),
      },
      {
        loanToken: 'token2',
        userAddress: '0x123',
        investorAddress: '0xabc',
        borrowedStatus: 'pending',
        loanAmount: 1000,
        collateralAmount: 500,
        collateralToken: 'BTC',
        loanPeriod: new Date(Date.parse('31 Dec 2023 00:00:00 GMT')),
        loanRequestPeriod: new Date(Date.parse('30 Nov 2023 00:00:00 GMT')),
        healthFactor: '1.8',
        interestRate: '5',
        initialThreshold: '0.8',
        liquidationThreshold: '0.5',
        nftManager: 'Manager1',
        nftVersion: '1.0',
        creationDate: new Date(),
        updatedDate: new Date(),
      },
      {
        loanToken: 'token3',
        userAddress: '0x123',
        investorAddress: '0xabc',
        borrowedStatus: 'pending',
        loanAmount: 1000,
        collateralAmount: 500,
        collateralToken: 'BTC',
        loanPeriod: new Date(Date.parse('31 Dec 2023 00:00:00 GMT')),
        loanRequestPeriod: new Date(Date.parse('30 Nov 2023 00:00:00 GMT')),
        healthFactor: '0.8',
        interestRate: '5',
        initialThreshold: '0.8',
        liquidationThreshold: '0.5',
        nftManager: 'Manager1',
        nftVersion: '1.0',
        creationDate: new Date(),
        updatedDate: new Date(),
      },
      {
        loanToken: 'token4',
        userAddress: '0x456',
        investorAddress: '0xdef',
        borrowedStatus: 'borrowed',
        loanAmount: 2000,
        collateralAmount: 1000,
        collateralToken: 'ETH',
        loanPeriod: new Date(Date.parse('31 Dec 2025 00:00:00 GMT')),
        loanRequestPeriod: new Date(Date.parse('30 Nov 2025 00:00:00 GMT')),
        healthFactor: '2.0',
        interestRate: '4',
        initialThreshold: '0.7',
        liquidationThreshold: '0.4',
        nftManager: 'Manager2',
        nftVersion: '2.0',
        creationDate: new Date(),
        updatedDate: new Date(),
      },
    ];

    await LoanModel.create(testLoans);

    await testApiHandler({
      appHandler,
      url: '/api/liquidateable-loan',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        expect(response.status).toBe(200);
        const json = await response.json();
        expect(json.length).toBe(3);
      },
    });
  });

  it('should return 405 if method is not GET', async () => {
    // Call the GET handler function with a non-GET method
    await testApiHandler({
      appHandler,
      url: '/api/liquidateable-loan',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        expect(response.status).toBe(405);
      },
    });
  });
});
