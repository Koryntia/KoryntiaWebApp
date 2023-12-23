
import { watchReadContract } from '@wagmi/core'

import LoanPositionManagerAbi from "../../../abis/loanPositionManager"

const feedsFinder = ()=>{
 watchReadContract(
  {
    address: '0xD505B8CF9fBD7Ebbc54295387940605f41769a82',// this is the old contract 
    abi: LoanPositionManagerAbi,
    functionName: 'getPrice',
    args: ['0x41aF19fb4495eF9D62fB0bccfa2C482A61F97851'], //ETH https://sepolia.etherscan.io/address/0x41af19fb4495ef9d62fb0bccfa2c482a61f97851
  },
  (data) => console.log(data),
)
}
export default feedsFinder;




