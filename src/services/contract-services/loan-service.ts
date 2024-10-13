import { ethers } from 'ethers';
import LoanPositionManagerABI from '@/abis/LoanPositionManager.json';
import OracleABI from '@/abis/Oracle.json'
import config from "@/utils/config";
import MessageHandler from "@/utils/message-handler";
import { ILoanPosition } from "@/interfaces/loan-position-interface";

const messageHandler = MessageHandler.get();

class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Signer;
  private loanPositionManagerContract: ethers.Contract;
  private oracleContract: ethers.Contract;

  // Zero address
  private ZERO_ADDRESS: string = '0x0000000000000000000000000000000000000000' 

  constructor(signer: ethers.Signer) {
    this.signer = signer;

    const loanPositionManagerAddress = config.LOAN_POSITION_MANAGER_ADDRESS;
    const oracleContractAddress = config.ORACLE_CONTRACT_ADDRESS;
    if (!loanPositionManagerAddress || !oracleContractAddress) {
      throw new Error("Missing LOAN_POSITION_MANAGER_ADDRESS in environment variables.");
    }

    this.loanPositionManagerContract = new ethers.Contract(
      loanPositionManagerAddress,
      LoanPositionManagerABI,
      this.signer
    );
    this.oracleContract = new ethers.Contract(
      oracleContractAddress,
      OracleABI,
      this.signer
    );
  }

  async getTokenBalance(tokenAddress: string): Promise<string | null> {
    try {
      const tokenContract = new ethers.Contract(tokenAddress, [
        "function balanceOf(address owner) view returns (uint256)",
      ], this.provider);
      const balance = await tokenContract.balanceOf(await this.signer.getAddress());
  
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
    ], this.signer);

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
          console.log(error);
          messageHandler.handleError((error as Error).message);
          resolve(null);
        });
      });
    } catch (error) {
      messageHandler.handleError((error as Error).message);
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

      // const debtAmount = await this.loanPositionManagerContract.calculateDebtAmount(
      //   loanPosition.loanToken,
      //   loanPosition.collateralAmount,
      //   loanPosition.loanToken,
      //   loanPosition.initialThreshold,
      // );
      // console.log(ethers.formatUnits(debtAmount));

      await this.approveSpender(
        loanPosition.loanToken,
        this.loanPositionManagerContract.target as string,
        loanPosition.loanAmount,
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
          messageHandler.handleError((error as Error).message);
          resolve(false);
        });
      });
    } catch (error) {
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

      console.log(ethers.formatUnits(await this.loanPositionManagerContract.calculateDebtAmount(
        loanPosition.collateralToken,
        loanPosition.collateralAmount,
        loanPosition.loanToken,
        loanPosition.initialThreshold,
      )));

      await this.approveSpender(
        loanPosition.loanToken,
        this.loanPositionManagerContract.target as string,
        loanPosition.loanAmount,
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
          console.log(error);
          messageHandler.handleError((error as Error).message);
          resolve(false);
        });
      });
    } catch (error) {
      console.log(error);
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
          messageHandler.handleError((error as Error).message);
          resolve(false);
        });
      });
    } catch (error) {
      messageHandler.handleError((error as Error).message);
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
          messageHandler.handleError((error as Error).message);
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
          messageHandler.handleError((error as Error).message);
          resolve(false);
        });
      });
    } catch (error) {
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

  async getTokenPrice(tokenAddress: string): Promise<number | null> {
    try {
      const [, price] = await this.oracleContract.getPrice(tokenAddress);
      return Number(ethers.formatUnits(price, 8));
    } catch (error) {
      console.log(error);
      messageHandler.handleError((error as Error).message);
      return null;
    }
  }

  async calculateMaxAllowedLiquidationThreshold(interestRate: ethers.BigNumberish): Promise<number | null> {
    try {
      const liquidationThreshold = await this.loanPositionManagerContract.calculateMaxAllowedLiquidationThreshold(interestRate);
      return Number(liquidationThreshold);
    } catch (error) {
      console.log(error);
      messageHandler.handleError((error as Error).message);
      return null;
    }
  }
}

export default BlockchainService;
