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
      console.log(loanId);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      expect(await user2_service.fundLoan(loanId)).toBe(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      expect(await user1_service.repay(loanId)).toBe(true);
    });
  });
});