import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import LoanServiceManager from './loan-service.initializer';
import { useEthersSigner } from './wagmi-to-ethers';

export const useLoanService = () => {
  const { isConnected } = useAccount();
  const signer = useEthersSigner();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isConnected && signer) {
      const manager = LoanServiceManager.getInstance();
      manager.init(signer);
      setIsInitialized(true);
    }
  }, [isConnected, signer])

  const LoanService = () => {
    const manager = LoanServiceManager.getInstance();
    return manager.get();
  }

  return { LoanService, isInitialized }
}