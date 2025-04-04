import { Signer } from 'ethers';
import MessageHandler from '@/utils/message-handler';
import { useEthersSigner } from '@/services/contract-services/wagmi-to-ethers';
import BlockchainService from '@/services/contract-services/loan-service';

const messageHandler = MessageHandler.get();

class LoanServiceManager {
  private static instance: LoanServiceManager | null = null;
  private loanService: BlockchainService | null = null;

  private constructor() {}

  static getInstance(): LoanServiceManager {
    if (!LoanServiceManager.instance) {
      LoanServiceManager.instance = new LoanServiceManager();
    }
    return LoanServiceManager.instance;
  }

  init(signer: Signer): void {
    if (!this.loanService) {
      this.loanService = new BlockchainService(signer);
    }
  }

  get(): BlockchainService {
    if (!this.loanService) {
      throw new Error('Loan service not initialized. Please connect wallet first.');
    }
    return this.loanService;
  }

  isInitialized(): boolean {
    return this.loanService !== null;
  }

  reinitialize(signer: Signer): void {
    this.loanService = new BlockchainService(signer);
    messageHandler.handleSuccess('Loan service reinitialized');
  }
}

export default LoanServiceManager;