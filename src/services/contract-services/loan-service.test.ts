import { ethers } from 'ethers';
import BlockchainService from './loan-service';
import config from "../../utils/config";

describe('BlockchainService Integration Tests', () => {
  let provider: ethers.JsonRpcProvider;
  let signer: ethers.Signer;
  let service: BlockchainService;

  beforeAll(async () => {
    // Connect to the local network
    provider = new ethers.JsonRpcProvider('http://localhost:8545');
    signer = await provider.getSigner(0);
    
    // Create the BlockchainService instance
    service = new BlockchainService(provider, await signer.getAddress());
    await service.init();
  });

  it('Service connects to LoanPositionManager contract', async () => {
    const loanToken="0x2170Ed0880ac9A755fd29B2688956BD959F933F8";
    const collateralToken="0xdAC17F958D2ee523a2206206994597C13D831ec7";
    const amount = 1;
    const collateralAmount = 2;
    const interestRate = 500;
    const liquidationThreshold = 9000;
    const initialThreshold = 9000;
    const loanRepayDeadline = 12345;
    const loanRequestDeadline = 12345;

    await expect(service.createLoan(
      loanToken,
      collateralToken,
      amount,
      collateralAmount,
      interestRate,
      liquidationThreshold,
      initialThreshold,
      loanRepayDeadline,
      loanRequestDeadline, 
    ))
      .resolves
      .not.toThrow();
  });

  it('Service connects to LoanPositionNFT contract', async () => {
    const tokenId = 1; // Assuming this is the ID of the loan we just created

    const loanDetails = await service.healthFactor(tokenId);
    console.log(loanDetails);
    expect(loanDetails).toBeDefined();
  });
});