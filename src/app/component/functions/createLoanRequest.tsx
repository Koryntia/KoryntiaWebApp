import { 
  useContractWrite, 
  usePrepareContractWrite, 
  useWaitForTransaction } from 'wagmi'
import LoanPositionManagerAbi from "../../../abis/loanPositionManager"
import { Address} from 'wagmi'
import { FC } from 'react'
import { parseEther } from 'viem';
/* 
 address loanToken,
 address collateralToken,
 uint256 collateralAmount,
 uint32 liquidationThreshold,
 uint32 initialThreshold,
 uint64 loanRepayDeadline,
 uint64 loanRequestDeadline,
 uint32 interestRate

 // BTC/USD  0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43

//ETH/USD  0x694AA1769357215DE4FAC081bf1f309aDC325306

sepolia testnet 0x22C1317FE43132b22860e8b465548613d6151a9F

import { useContractWrite, usePrepareContractWrite } from 'wagmi'
 
function App() {
  const { config } = usePrepareContractWrite({
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: wagmigotchiABI,
    functionName: 'feed',
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
 
  return (
    <div>
      <button disabled={!write} onClick={() => write?.()}>
        Feed
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  )
}



*/ 
interface pageProps{
    loanToken: Address;
    collateralToken:Address;
    collateralAmount:number;
    liquidationThreshold:number;
    initialThreshold:number;
    loanRepayDeadline:number;
    loanRequestDeadline:number;
    interestRate:number;
     }

const CreateLoanRequest: FC<pageProps>= ({loanToken, collateralToken, collateralAmount, liquidationThreshold, initialThreshold, loanRepayDeadline, loanRequestDeadline, interestRate})=>{
  if ( loanToken.length && collateralToken.length){
  const { config,   error: prepareError,
    isError: isPrepareError, } = usePrepareContractWrite({
    address: '0x4D080A303646fe3B8CDAdb9eB929148F9fCc5D6D',//address del contrato 
    abi: LoanPositionManagerAbi,
    functionName: 'createLoanPosition',
    args: [loanToken,  collateralToken, collateralAmount, liquidationThreshold, initialThreshold, loanRepayDeadline, loanRequestDeadline, interestRate],
  })
  const { data, error, isError, write } = useContractWrite(config)
  const {isLoading, isSuccess} = useWaitForTransaction({
    hash: data?.hash,
  })
      return (
        <div>
 <button  onClick={() => write?.()}>
        {isLoading ? 'creando...' : 'creado'}
      </button>
      {isSuccess && (
        <div>
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
      </div>
      )
}
}
export  default CreateLoanRequest




