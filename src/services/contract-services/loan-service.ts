import { ethers, ZeroAddress } from 'ethers';
import LoanPositionManagerArtifact from '@/abis/LoanPositionManager.json';
import LoanPositionNFTArtifact from '@/abis/LoanPositionNFT.json';
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
  private nftContract: ethers.Contract;

  // Zero address
  private ZERO_ADDRESS: string = '0x0000000000000000000000000000000000000000' 

  constructor(signer: ethers.Signer) {
    this.signer = signer;

    const loanPositionManagerAddress = config.LOAN_POSITION_MANAGER_ADDRESS;
    const oracleContractAddress = config.ORACLE_CONTRACT_ADDRESS;
    const nftAddress = config.NFT_ADDRESS;
    if (!loanPositionManagerAddress || !oracleContractAddress || !nftAddress) {
      throw new Error("Missing LOAN_POSITION_MANAGER_ADDRESS in environment variables.");
    }

    this.loanPositionManagerContract = new ethers.Contract(
      loanPositionManagerAddress,
      LoanPositionManagerArtifact.abi,
      this.signer
    );
    this.oracleContract = new ethers.Contract(
      oracleContractAddress,
      OracleABI,
      this.signer
    );
    this.nftContract = new ethers.Contract(
      nftAddress,
      LoanPositionNFTArtifact.abi,
      this.signer
    );
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
    collateralAmount: ethers.BigNumberish,  
    liquidationThreshold: ethers.BigNumberish,
    initialThreshold: ethers.BigNumberish,
    loanRepayDeadline: ethers.BigNumberish,
    loanRequestDeadline: ethers.BigNumberish,
    interestRate: ethers.BigNumberish,
  ): Promise<string | null> {
    try {
      // Aprobamos el gasto del token de colateral
      await this.approveSpender(
        collateralToken,
        this.loanPositionManagerContract.target as string,
        collateralAmount
      );
      
      return new Promise<string | null>((resolve) => {
        this.loanPositionManagerContract.once(
          "LoanPositionCreated",
          (
            loanId: ethers.BigNumberish,
            _eventCollateralAmount: ethers.BigNumberish,
            _eventInitialThreshold: ethers.BigNumberish,
            _borrower: string,
            _eventLoanToken: string,
            _eventCollateralToken: string,
            _event?: ethers.ContractEvent
          ) => {
            resolve(loanId.toString());
          }
        );
    
        this.loanPositionManagerContract.createLoanPosition(
          loanToken,
          collateralToken,
          collateralAmount,
          liquidationThreshold,
          initialThreshold,
          loanRepayDeadline,
          loanRequestDeadline,
          interestRate
        ).catch((error: any) => {
           messageHandler.handleError(`Error al crear el préstamo: ${error.message}`);
           resolve(null);
        });
      });
    } catch (error: any) {
      messageHandler.handleError(`Error en createLoan: ${error.message}`);
      return null;
    }
  }  
  
  async getLoanNFTDetails(loanId: number): Promise<ILoanPosition | null> {
    try {
      const loanPosition = await this.loanPositionManagerContract.getLoanPositions(loanId);
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

  async fundLoan(loanId: ethers.BigNumberish): Promise<boolean> {
    try{
      const loanPosition = await this.loanPositionManagerContract.getLoanPositions(loanId);
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
              _loanId: ethers.BigNumberish,
              _loanAmount: ethers.BigNumberish,
              _debtAmount: ethers.BigNumberish,
              _event: ethers.ContractEvent
            ) => {
          resolve(true);
        });
        const bigLoanId = BigInt(loanId.toString());
        
        this.loanPositionManagerContract.fundLoan(bigLoanId).catch((error) => {
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
      const loanPosition = await this.loanPositionManagerContract.getLoanPositions(loanId);
      if (
        !(loanPosition) ||
        (loanPosition.borrowerAddress === this.ZERO_ADDRESS &&
        ethers.formatUnits(loanPosition.loanAmount) === "0.0" &&
        ethers.formatUnits(loanPosition.collateralAmount) === "0.0")
      ) {
        return false;
      }

      let debtAmount = await this.loanPositionManagerContract.calculateDebtAmount(
        loanPosition.collateralToken,
        loanPosition.collateralAmount,
        loanPosition.loanToken,
        loanPosition.initialThreshold,
      );
      debtAmount = ethers.parseEther(
        Math.ceil(ethers.formatUnits(debtAmount)).toString()
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
          messageHandler.handleError((error as Error).message);
          resolve(false);
        });
      });
    } catch (error) {
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
              _loanId: ethers.BigNumberish,
              _event: ethers.ContractEvent
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
      const loanPosition = await this.loanPositionManagerContract.getLoanPositions(loanId);
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

  async withdrawCollateral(loanId: ethers.BigNumberish): Promise<boolean> {
    try {
      const loanPosition = await this.loanPositionManagerContract.getLoanPositions(loanId);
      const formattedLoanAmount = ethers.formatUnits(loanPosition.loanAmount, 18);
      const formattedCollateralAmount = ethers.formatUnits(loanPosition.collateralAmount, 18);
      if (
        !loanPosition ||
        (loanPosition.borrowerAddress === this.ZERO_ADDRESS &&
         formattedLoanAmount === "0.0" &&
         formattedCollateralAmount === "0.0")
      ) {
        messageHandler.handleError("Loan position not found");
        return false;
      }
  
      return new Promise<boolean>((resolve) => {
        this.nftContract.once('Transfer', (from: string, to: string, tokenId: ethers.BigNumberish, event: ethers.ContractEvent) => {
          if (to === ZeroAddress && tokenId.toString() === loanId.toString()) {
             resolve(true);
          }
       });
       
        this.loanPositionManagerContract.withdrawCollateral(loanId)
          .then((tx: any) => {})
          .catch((error: any) => {
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
      messageHandler.handleError((error as Error).message);
      return null;
    }
  }
}

export default BlockchainService;
