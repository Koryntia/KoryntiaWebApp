// BTC/USD  0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43

//ETH/USD  0x694AA1769357215DE4FAC081bf1f309aDC325306

// LINK/USD  0xc59E3633BAAC79493d908e63626716e204A45EdF

// USDC/ USD 0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270Eç
import { watchReadContract } from '@wagmi/core'
import LoanPositionManagerAbi from "../../../abis/loanPositionManager"

const feedsFinder = ()=>{
 watchReadContract(
  {
    address: '0xD505B8CF9fBD7Ebbc54295387940605f41769a82',
    abi: LoanPositionManagerAbi,
    functionName: 'getPrice',
    args: ['0x694AA1769357215DE4FAC081bf1f309aDC325306'],
  },
  (data) => console.log(data),
)
}
export default feedsFinder;




