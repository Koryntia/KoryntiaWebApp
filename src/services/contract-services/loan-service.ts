import { ethers, Provider, Signer } from 'ethers';
import LoanPositionManagerABI from '@/abis/LoanPositionManager.json';
import LoanPositionNFTABI from '@/abis/LoanPositionNFT.json';
import OracleABI from '@/abis/Oracle.json';
import config from "@/utils/config";

class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.JsonRpcSigner;
  private userAddress: string;

  private loanPositionManagerContract: ethers.Contract;

  constructor(userAddress: string) {
    this.provider = new ethers.JsonRpcProvider("http://localhost:8545");
    this.userAddress = userAddress;

    const loanPositionManagerAddress = config.LOAN_POSITION_MANAGER_ADDRESS;
    if (!(loanPositionManagerAddress)) {
      throw new Error("Missing contract addresses in environment variables.");
    }
  }

  async init() {
    const loanPositionManagerAddress = config.LOAN_POSITION_MANAGER_ADDRESS as string;

    this.signer = await this.provider.getSigner();
    this.loanPositionManagerContract = new ethers.Contract(loanPositionManagerAddress, LoanPositionManagerABI, this.signer);
    try {
      const wallet = new ethers.Wallet(this.userAddress, this.provider);
      this.loanPositionManagerContract.connect(wallet);
    } catch (error) {
      console.log(error);
    }
  };

  async createLoan(
    loanToken: string,
    collateralToken: string,
    amount: ethers.BigNumberish,
    collateralAmount: ethers.BigNumberish,
    liquidationThreshold: ethers.BigNumberish,
    initialThreshold: ethers.BigNumberish,
    loanRepayDeadline: ethers.BigNumberish,
    loanRequestDeadline: ethers.BigNumberish,
    interestRate: ethers.BigNumberish,
    ): Promise<number | null> {
    try {
      const loanId = await this.loanPositionManagerContract.createLoanPosition(
        loanToken,
        collateralToken,
        collateralAmount,
        liquidationThreshold,
        initialThreshold,
        loanRepayDeadline,
        loanRequestDeadline,
        interestRate
      );

      console.log('Loan created successfully: ', loanId);
      return loanId;
    } catch (error) {
      console.error('Error creating loan:', error);
      return null;
    }
  }

  // Example: interact with LoanPositionNFT contract
  async getLoanNFTDetails(tokenId: number): Promise<any> {
    try {
      const loanPosition = await this.loanPositionManagerContract.getLoanPositions(tokenId);
      
      // Parse the returned data into a more readable format
      return {
        borrowerAddress: loanPosition.borrowerAddress,
        lenderAddress: loanPosition.lenderAddress,
        loanToken: loanPosition.loanToken,
        loanAmount: ethers.formatUnits(loanPosition.loanAmount, 18), // Assuming 18 decimals, adjust if different
        collateralToken: loanPosition.collateralToken,
        collateralAmount: ethers.formatUnits(loanPosition.collateralAmount, 18), // Assuming 18 decimals, adjust if different
        liquidationThreshold: loanPosition.liquidationThreshold.toString(),
        initialThreshold: loanPosition.initialThreshold.toString(),
        loanRepayDeadline: new Date(Number(loanPosition.loanRepayDeadline) * 1000).toISOString(), // Convert to ISO date string
        loanRequestDeadline: new Date(Number(loanPosition.loanRequestDeadline) * 1000).toISOString(), // Convert to ISO date string
        interestRate: loanPosition.interestRate.toString()
      };
    } catch (error) {
      console.error('Error fetching loan details:', error);
    }
  }

  // Create Loan Position
  async createLoanPosition(collateralAmount: ethers.BigNumberish): Promise<ethers.ContractEvent> {
    const tx = await this.loanPositionManagerContract.createLoanPosition(collateralAmount);
    return tx.wait();
  }

  // Fund Loan
  async fundLoan(loanId: number, amount: ethers.BigNumberish): Promise<ethers.ContractEvent> {
    const tx = await this.loanPositionManagerContract.fundLoan(loanId, amount);
    return tx.wait();
  }

  // Repay Loan
  async repay(loanId: number, amount: ethers.BigNumberish): Promise<ethers.ContractEvent> {
    const tx = await this.loanPositionManagerContract.repay(loanId, amount);
    return tx.wait();
  }

  // Liquidate Loan
  async liquidate(loanId: number): Promise<ethers.ContractEvent> {
    const tx = await this.loanPositionManagerContract.liquidate(loanId);
    return tx.wait();
  }

  // Add Collateral
  async addCollateral(loanId: number, amount: ethers.BigNumberish): Promise<ethers.ContractEvent> {
    const tx = await this.loanPositionManagerContract.addCollateral(loanId, amount);
    return tx.wait();
  }

  // Check Health Factor
  async healthFactor(loanId: number): Promise<ethers.BigNumberish> {
    return this.loanPositionManagerContract.healthFactor(loanId);
  }

}

export default BlockchainService;
