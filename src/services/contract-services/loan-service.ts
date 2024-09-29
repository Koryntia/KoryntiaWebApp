import { ethers } from 'ethers';
import LoanPositionManagerABI from '@/abis/LoanPositionManager.json';
import config from "@/utils/config";
import MessageHandler from "@/services/message-handler";
import { ILoanPosition } from "@/interfaces/loan-position-interface";

const messageHandler = MessageHandler.get();

class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.JsonRpcSigner;
  private wallet: ethers.Wallet;
  private loanPositionManagerContract: ethers.Contract;

  // Zero address
  private ZERO_ADDRESS: string = '0x0000000000000000000000000000000000000000' 

  constructor(privateKey: string) {
    this.provider = new ethers.JsonRpcProvider(config.RPC_URL as string);
    this.wallet = new ethers.Wallet(privateKey, this.provider);

    const loanPositionManagerAddress = config.LOAN_POSITION_MANAGER_ADDRESS;
    if (!loanPositionManagerAddress) {
      throw new Error("Missing LOAN_POSITION_MANAGER_ADDRESS in environment variables.");
    }

    this.loanPositionManagerContract = new ethers.Contract(
      loanPositionManagerAddress,
      LoanPositionManagerABI,
      this.wallet
    );
  }

  async getTokenBalance(tokenAddress: string): Promise<string | null> {
    try {
      const tokenContract = new ethers.Contract(tokenAddress, [
        "function balanceOf(address owner) view returns (uint256)",
      ], this.provider);
      const balance = await tokenContract.balanceOf(this.wallet.address);
  
      return ethers.formatEther(balance);
    } catch (error) {
      messageHandler.handleError((error as Error).message);
      return null;
    }
  }

  async approveSpender(
    tokenAddress: string,
    spenderAddress: string,
    amount: ethers.BigNumberish
  ): Promise<void> {
    const tokenContract = new ethers.Contract(tokenAddress, [
      "function approve(address spender, uint256 amount) external returns (bool)",
    ], this.wallet);

    const tx = await tokenContract.approve(spenderAddress, amount);
    await tx.wait();
  }

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
      await this.approveSpender(
        collateralToken,
        this.loanPositionManagerContract.target as string,
        collateralAmount
      );
      
      return new Promise<number | null>((resolve) => {
        this.loanPositionManagerContract.once("LoanPositionCreated",
            (
              borrower: string,
              loanId: ethers.BigNumberish,
              collateralAmount: ethers.BigNumberish,
              amount: ethers.BigNumberish,
              event: ethers.ContractEvent
            ) => {
          resolve(Number(loanId));
        });

        this.loanPositionManagerContract.createLoanPosition(
          loanToken,
          collateralToken,
          amount,
          collateralAmount,
          liquidationThreshold,
          initialThreshold,
          loanRepayDeadline,
          loanRequestDeadline,
          interestRate,
        ).catch((error) => {
          messageHandler.handleError(`Error creating loan: ${(error as Error).message}`);
          resolve(null);
        });
      });
    } catch (error) {
      messageHandler.handleError(`Error in createLoan: ${(error as Error).message}`);
      return null;
    }
  }

  async getLoanNFTDetails(loanId: number): Promise<ILoanPosition | null> {
    try {
      const loanPosition = await this.loanPositionManagerContract.getLoanPosition(loanId);
      if (
        !(loanPosition) ||
        (loanPosition.borrowerAddress === this.ZERO_ADDRESS &&
        ethers.formatUnits(loanPosition.loanAmount) === "0.0" &&
        ethers.formatUnits(loanPosition.collateralAmount) === "0.0")
      ) {
        messageHandler.handleError('Loan position not found or contains only default values.');
        return null;
      }
      
      return {
        borrowerAddress: loanPosition.borrowerAddress,
        lenderAddress: loanPosition.lenderAddress,
        loanToken: loanPosition.loanToken,
        loanAmount: ethers.formatUnits(loanPosition.loanAmount, 18),
        collateralToken: loanPosition.collateralToken,
        collateralAmount: ethers.formatUnits(loanPosition.collateralAmount, 18),
        liquidationThreshold: loanPosition.liquidationThreshold.toString(),
        initialThreshold: loanPosition.initialThreshold.toString(),
        loanRepayDeadline: new Date(Number(loanPosition.loanRepayDeadline) * 1000).toISOString(),
        loanRequestDeadline: new Date(Number(loanPosition.loanRequestDeadline) * 1000).toISOString(),
        interestRate: loanPosition.interestRate.toString()
      };
    } catch (error) {
      messageHandler.handleError((error as Error).message);
      return null;
    }
  }

  async fundLoan(loanId: number): Promise<boolean> {
    try{
      const loanPosition = await this.loanPositionManagerContract.getLoanPosition(loanId);
      if (
        !(loanPosition) ||
        (loanPosition.borrowerAddress === this.ZERO_ADDRESS &&
        ethers.formatUnits(loanPosition.loanAmount) === "0.0" &&
        ethers.formatUnits(loanPosition.collateralAmount) === "0.0")
      ) {
        return false;
      }

      const debtAmount = await this.loanPositionManagerContract.calculateDebtAmount(
        loanPosition.collateralToken,
        loanPosition.collateralAmount,
        loanPosition.loanToken,
        loanPosition.initialThreshold,
      );

      await this.approveSpender(
        loanPosition.loanToken,
        this.loanPositionManagerContract.target as string,
        debtAmount,
      );

      return new Promise<boolean>((resolve) => {
        this.loanPositionManagerContract.once("LoanFunded",
            (
              loanId: ethers.BigNumberish,
              loanAmount: ethers.BigNumberish,
              debtAmount: ethers.BigNumberish,
              event: ethers.ContractEvent
            ) => {
          resolve(true);
        });

        this.loanPositionManagerContract.fundLoan(loanId).catch((error) => {
          console.error(error);
          messageHandler.handleError(`Error funding loan: ${(error as Error).message}`);
          resolve(false);
        });
      });
    } catch (error) {
      console.error(error);
      messageHandler.handleError((error as Error).message);
      return false;
    }
  }

  // Repay Loan
  async repay(loanId: number): Promise<boolean> {
    try{
      const loanPosition = await this.loanPositionManagerContract.getLoanPosition(loanId);
      if (
        !(loanPosition) ||
        (loanPosition.borrowerAddress === this.ZERO_ADDRESS &&
        ethers.formatUnits(loanPosition.loanAmount) === "0.0" &&
        ethers.formatUnits(loanPosition.collateralAmount) === "0.0")
      ) {
        return false;
      }

      const debtAmount = await this.loanPositionManagerContract.calculateDebtAmount(
        loanPosition.collateralToken,
        loanPosition.collateralAmount,
        loanPosition.loanToken,
        loanPosition.initialThreshold,
      );

      await this.approveSpender(
        loanPosition.loanToken,
        this.loanPositionManagerContract.target as string,
        debtAmount,
      );

      return new Promise<boolean>((resolve) => {
        this.loanPositionManagerContract.once("LoanRepaid",
            (
              loanId: ethers.BigNumberish,
              event: ethers.ContractEvent
            ) => {
          resolve(true);
        });

        this.loanPositionManagerContract.repay(loanId).catch((error) => {
          console.error(error);
          messageHandler.handleError(`Error repaying loan: ${(error as Error).message}`);
          resolve(false);
        });
      });
    } catch (error) {
      console.error(error);
      messageHandler.handleError((error as Error).message);
      return false;
    }
  }

  // Liquidate Loan
  async liquidate(loanId: number): Promise<boolean> {
    try {
      return new Promise<boolean>((resolve) => {
        this.loanPositionManagerContract.once("LoanLiquidation",
            (
              loanId: ethers.BigNumberish,
              event: ethers.ContractEvent
            ) => {
          resolve(true);
        });

        this.loanPositionManagerContract.liquidate(loanId).catch((error) => {
          console.error(error);
          messageHandler.handleError(`Error creating loan: ${(error as Error).message}`);
          resolve(false);
        });
      });
    } catch (error) {
      console.error(error);
      messageHandler.handleError(`Error liquidating loan: ${(error as Error).message}`);
      return false;
    }
  }

  // Add Collateral
  async addCollateral(loanId: number, amount: ethers.BigNumberish): Promise<boolean> {
    try {
      const loanPosition = await this.loanPositionManagerContract.getLoanPosition(loanId);
      if (
        !(loanPosition) ||
        (loanPosition.borrowerAddress === this.ZERO_ADDRESS &&
        ethers.formatUnits(loanPosition.loanAmount) === "0.0" &&
        ethers.formatUnits(loanPosition.collateralAmount) === "0.0")
      ) {
        messageHandler.handleError("Loan position not found");
        return false;
      }

      await this.approveSpender(
        loanPosition.collateralToken,
        this.loanPositionManagerContract.target as string,
        amount,
      );

      return new Promise<boolean>((resolve) => {
        this.loanPositionManagerContract.once("CollateralAdded",
            (
              loanId: ethers.BigNumberish,
              amount: ethers.BigNumberish,
              event: ethers.ContractEvent,
            ) => {
          resolve(true);
        });

        this.loanPositionManagerContract.addCollateral(loanId, amount).catch((error) => {
          messageHandler.handleError(`Error adding collateral: ${(error as Error).message}`);
          resolve(false);
        });
      });
    } catch (error) {
      messageHandler.handleError((error as Error).message);
      return false;
    }
  }

  async withdrawCollateral(loanId: number): Promise<boolean> {
    try {
      const loanPosition = await this.loanPositionManagerContract.getLoanPosition(loanId);
      if (
        !(loanPosition) ||
        (loanPosition.borrowerAddress === this.ZERO_ADDRESS &&
        ethers.formatUnits(loanPosition.loanAmount) === "0.0" &&
        ethers.formatUnits(loanPosition.collateralAmount) === "0.0")
      ) {
        messageHandler.handleError("Loan position not found");
        return false;
      }

      return new Promise<boolean>((resolve) => {
        this.loanPositionManagerContract.once("CollateralWithdrawn",
            (
              loanId: ethers.BigNumberish,
              event: ethers.ContractEvent,
            ) => {
          resolve(true);
        });

        this.loanPositionManagerContract.withdrawCollateral(loanId).catch((error) => {
          console.log(error);
          messageHandler.handleError(`Error withdrawing collateral: ${(error as Error).message}`);
          resolve(false);
        });
      });
    } catch (error) {
      console.log(error);
      messageHandler.handleError((error as Error).message);
      return false;
    }
  }

  // Check Health Factor
  async healthFactor(loanId: number): Promise<number | null> {
    try {
      const healthFactor = await this.loanPositionManagerContract.healthFactor(loanId);
      if (healthFactor === 0) {
        messageHandler.handleError("Loan not found or health factor too low");
        return null;
      }

      return Number(ethers.formatUnits(healthFactor, 18));
    } catch (error) {
      messageHandler.handleError((error as Error).message);
      return null;
    }
  }

}

export default BlockchainService;
