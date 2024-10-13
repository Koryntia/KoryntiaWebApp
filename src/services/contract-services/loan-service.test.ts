import { ethers } from 'ethers';
import BlockchainService from './loan-service';
import config, { test_config } from "@/utils/config";
import MessageHandler from '@/utils/message-handler';
import { getPriceApi } from '@/services/api/getPrice';

jest.mock('@/utils/message-handler', () => {
  return {
    get: jest.fn(() => ({
      handleError: jest.fn(),
      handleSuccess: jest.fn(),
      info: jest.fn(),
    })),
  };
});

describe('Integration Tests', () => {
  const TOKEN_A = test_config.TOKEN_A as string;
  const TOKEN_B = test_config.TOKEN_B as string;

  let user1_service: BlockchainService;
  let user2_service: BlockchainService;

  beforeAll(async () => {
    const provider = new ethers.JsonRpcProvider(config.RPC_URL as string);

    const user1 = new ethers.Wallet('0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d', provider);
    const user2 = new ethers.Wallet('0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a', provider);

    user1_service = new BlockchainService(user1);
    user2_service = new BlockchainService(user2);
  });
  
  describe('Loan Creation, Loan Details and Health Factors', () => {
    let mockMessageHandler: jest.Mocked<MessageHandler>;

    beforeAll(async () => {});

    beforeEach(() => {
      mockMessageHandler = MessageHandler.get() as jest.Mocked<MessageHandler>;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Creates loan successfully with valid data', async () => {
      const loanToken=TOKEN_A;
      const collateralToken=TOKEN_B;
      const amount = ethers.parseEther("1");
      const collateralAmount = ethers.parseEther("2");
      const interestRate = 500;
      const liquidationThreshold = 9000;
      const initialThreshold = 5000;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const loanRequestDeadline = currentTimestamp + 3600;
      const loanRepayDeadline = currentTimestamp + 86400;

      const loanId = await user1_service.createLoan(
        loanToken,
        collateralToken,
        amount,
        collateralAmount,
        liquidationThreshold,
        initialThreshold,
        loanRepayDeadline,
        loanRequestDeadline,
        interestRate,
      );

      expect(mockMessageHandler.handleError).not.toHaveBeenCalled();
      expect(Number.isInteger(loanId)).toBe(true);
    });

    it('Creates loan fails with invalid data', async () => {
      const loanToken=TOKEN_A;
      const collateralToken=TOKEN_B;
      const amount = ethers.parseEther("1");
      const collateralAmount = ethers.parseEther("2");
      const interestRate = 500;
      const liquidationThreshold = 9000;
      const initialThreshold = 5000;

      // Invalid dates
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const loanRequestDeadline = currentTimestamp - 86400;
      const loanRepayDeadline = currentTimestamp - 3600;

      expect(await user1_service.createLoan(
        loanToken,
        collateralToken,
        amount,
        collateralAmount,
        liquidationThreshold,
        initialThreshold,
        loanRepayDeadline,
        loanRequestDeadline,
        interestRate,
      )).toBe(null);
    });

    it('Service gets LoanPositionNFT details for existing id', async () => {
      const loanToken=TOKEN_A;
      const collateralToken=TOKEN_B;
      const amount = ethers.parseEther("1");
      const collateralAmount = ethers.parseEther("2");
      const interestRate = 500;
      const liquidationThreshold = 9000;
      const initialThreshold = 5000;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const loanRequestDeadline = currentTimestamp + 3600;
      const loanRepayDeadline = currentTimestamp + 86400;
      const loanId = await user1_service.createLoan(
        loanToken,
        collateralToken,
        amount,
        collateralAmount,
        liquidationThreshold,
        initialThreshold,
        loanRepayDeadline,
        loanRequestDeadline,
        interestRate,
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));

      expect(await user1_service.getLoanNFTDetails(loanId)).not.toBe(null);
    });

    it('Service returns null for non-existent id', async () => {
      expect(await user1_service.getLoanNFTDetails(9999)).toBe(null);
    });

    it('Successfully gets health factor for valid loan Id', async () => {
      const loanToken=TOKEN_A;
      const collateralToken=TOKEN_B;
      const amount = ethers.parseEther("1");
      const collateralAmount = ethers.parseEther("2");
      const interestRate = 500;
      const liquidationThreshold = 9000;
      const initialThreshold = 5000;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const loanRequestDeadline = currentTimestamp + 3600;
      const loanRepayDeadline = currentTimestamp + 86400;
      const loanId = await user1_service.createLoan(
        loanToken,
        collateralToken,
        amount,
        collateralAmount,
        liquidationThreshold,
        initialThreshold,
        loanRepayDeadline,
        loanRequestDeadline,
        interestRate,
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));

      expect(await user1_service.healthFactor(loanId)).not.toBe(null);
    });

    it('HealthFactor successfully handles nonexistent loan Id', async () => {
      expect(await user1_service.healthFactor(1)).toBe(null);
      // expect(mockMessageHandler.handleError).toHaveBeenCalled();
    });
  });

  describe('Loan Funding and Liquidation', () => {
    let mockMessageHandler: jest.Mocked<MessageHandler>;

    beforeAll(async () => {});

    beforeEach(() => {
      mockMessageHandler = MessageHandler.get() as jest.Mocked<MessageHandler>;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should successfully fund loan', async () => {
      const loanToken=TOKEN_A;
      const collateralToken=TOKEN_B;
      const amount = ethers.parseEther("1");
      const collateralAmount = ethers.parseEther("2");
      const interestRate = 500;
      const liquidationThreshold = 9000;
      const initialThreshold = 5000;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const loanRequestDeadline = currentTimestamp + 3600;
      const loanRepayDeadline = currentTimestamp + 86400;
  
      const loanId = (await user1_service.createLoan(
        loanToken,
        collateralToken,
        amount,
        collateralAmount,
        liquidationThreshold,
        initialThreshold,
        loanRepayDeadline,
        loanRequestDeadline,
        interestRate,
      )) as number;
      
      expect(await user2_service.fundLoan(loanId)).toBe(true);
    });

    it('Should successfully handle invalid id', async () => {
      expect(await user2_service.fundLoan(9999)).toBe(false);
    });

    it('Should liquidate funded loans', async () => {
      const loanToken=TOKEN_A;
      const collateralToken=TOKEN_B;
      const amount = ethers.parseEther("1");
      const collateralAmount = ethers.parseEther("2");
      const interestRate = 500;
      const liquidationThreshold = 9000;
      const initialThreshold = 5000;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const loanRequestDeadline = currentTimestamp + 5;
      const loanRepayDeadline = currentTimestamp + 10;
  
      const loanId = (await user1_service.createLoan(
        loanToken,
        collateralToken,
        amount,
        collateralAmount,
        liquidationThreshold,
        initialThreshold,
        loanRepayDeadline,
        loanRequestDeadline,
        interestRate,
      )) as number;
      await user2_service.fundLoan(loanId);

      const delay = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
      await delay(50);

      expect(await user2_service.liquidate(loanId)).toBe(true);
    });

    it('Should not liquidate if repayment date is not passed', async () => {
      const loanToken=TOKEN_A;
      const collateralToken=TOKEN_B;
      const amount = ethers.parseEther("1");
      const collateralAmount = ethers.parseEther("2");
      const interestRate = 500;
      const liquidationThreshold = 9000;
      const initialThreshold = 5000;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const loanRequestDeadline = currentTimestamp + 3600;
      const loanRepayDeadline = currentTimestamp + 86400;
  
      const loanId = (await user1_service.createLoan(
        loanToken,
        collateralToken,
        amount,
        collateralAmount,
        liquidationThreshold,
        initialThreshold,
        loanRepayDeadline,
        loanRequestDeadline,
        interestRate,
      )) as number;
      await user2_service.fundLoan(loanId);

      expect(await user2_service.liquidate(loanId)).toBe(false);
    });
  });

  describe('Add and Withdraw Collateral and Repay Loans', () => {
    let mockMessageHandler: jest.Mocked<MessageHandler>;

    beforeEach(() => {
      mockMessageHandler = MessageHandler.get() as jest.Mocked<MessageHandler>;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Successfully adds collateral', async () => {
      const loanToken=TOKEN_A;
      const collateralToken=TOKEN_B;
      const amount = ethers.parseEther("1");
      const collateralAmount = ethers.parseEther("2");
      const interestRate = 500;
      const liquidationThreshold = 9000;
      const initialThreshold = 5000;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const loanRequestDeadline = currentTimestamp + 3600;
      const loanRepayDeadline = currentTimestamp + 86400;
  
      const loanId = (await user1_service.createLoan(
        loanToken,
        collateralToken,
        amount,
        collateralAmount,
        liquidationThreshold,
        initialThreshold,
        loanRepayDeadline,
        loanRequestDeadline,
        interestRate,
      )) as number;

      await new Promise((resolve) => setTimeout(resolve, 3000));
      expect(await user1_service.addCollateral(loanId, ethers.parseEther("1"))).toBe(true);
      expect(Number((await user1_service.getLoanNFTDetails(loanId))?.collateralAmount)).toBeGreaterThan(2);
    });

    it('Successfully withdraws collateral', async () => {
      const loanToken=TOKEN_A;
      const collateralToken=TOKEN_B;
      const amount = ethers.parseEther("1");
      const collateralAmount = ethers.parseEther("2");
      const interestRate = 500;
      const liquidationThreshold = 9000;
      const initialThreshold = 5000;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const loanRequestDeadline = currentTimestamp + 3600;
      const loanRepayDeadline = currentTimestamp + 86400;
  
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const loanId = (await user1_service.createLoan(
        loanToken,
        collateralToken,
        amount,
        collateralAmount,
        liquidationThreshold,
        initialThreshold,
        loanRepayDeadline,
        loanRequestDeadline,
        interestRate,
      )) as number;

      expect(await user1_service.withdrawCollateral(loanId)).toBe(true);
    });

    it('Successfully repays loans', async () => {
      const loanToken=TOKEN_A;
      const collateralToken=TOKEN_B;
      const amount = ethers.parseEther("1");
      const collateralAmount = ethers.parseEther("2");
      const interestRate = 500;
      const liquidationThreshold = 9000;
      const initialThreshold = 5000;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const loanRequestDeadline = currentTimestamp + 3600;
      const loanRepayDeadline = currentTimestamp + 86400;
  
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const loanId = (await user1_service.createLoan(
        loanToken,
        collateralToken,
        amount,
        collateralAmount,
        liquidationThreshold,
        initialThreshold,
        loanRepayDeadline,
        loanRequestDeadline,
        interestRate,
      )) as number;

      await new Promise((resolve) => setTimeout(resolve, 3000));
      expect(await user2_service.fundLoan(loanId)).toBe(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      expect(await user1_service.repay(loanId)).toBe(true);
    });

    it('Successfully handles invalid loan ID', async () => {
      expect(await user1_service.repay(9999)).toBe(false);
    });

    it('Should not repay if repayment date is passed', async () => {
      const loanToken=TOKEN_A;
      const collateralToken=TOKEN_B;
      const amount = ethers.parseEther("1");
      const collateralAmount = ethers.parseEther("2");
      const interestRate = 500;
      const liquidationThreshold = 9000;
      const initialThreshold = 5000;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const loanRequestDeadline = currentTimestamp + 2;
      const loanRepayDeadline = currentTimestamp + 5;
  
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const loanId = (await user1_service.createLoan(
        loanToken,
        collateralToken,
        amount,
        collateralAmount,
        liquidationThreshold,
        initialThreshold,
        loanRepayDeadline,
        loanRequestDeadline,
        interestRate,
      )) as number;
      expect(await user2_service.fundLoan(loanId)).toBe(true);

      const delay = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
      await delay(40);

      expect(await user1_service.repay(loanId)).toBe(false);
    });
  });

  describe('Oracle Integration tests', () => {
    it('Gets token prices', async () => {
      expect(await user1_service.getTokenPrice(TOKEN_A)).toBe(2);
    });

    it('Gets token prices', async () => {
      expect((await getPriceApi(TOKEN_A)).price).toBe(2);
    });
  });
});