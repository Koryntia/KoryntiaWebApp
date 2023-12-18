"use client"
import Cardcontainer from "@/app/component/common/Cards/cardcontainer";
import feedsFinder from "@/app/component/functions/findFees";
import { FC, useState } from "react";
import { Address, useAccount, useBlockNumber} from "wagmi";
import Balance from "@/app/component/functions/BalanceFinder";
import getBlockTimeStamp from "@/app/component/functions/getBlocktimeStamp";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { parse } from "path";

interface pageProps {
    
}
 
const page: FC<pageProps> = () => {
  const [selectedValue, setSelectedValue] = useState<string>('1');
  const [showResult, setShowResult] = useState<boolean>(false);
    const {data, isError, isLoading} = useBlockNumber()
   
    const handleGetBlockTime = (s: string)=>{
      const n = parseInt(s);
      if(isLoading){
         return <div>Fetching block number</div>
      }
      if(isError){
         return <div>Error Fetching block number</div>
      }
           let amountAdd =  216000 * n//216000 is the number of blocks that represents 30 days
      let loanRepayDeadLineAddedAmount = BigInt(amountAdd);
      let loanRepayDeadLine = loanRepayDeadLineAddedAmount;
      if(data?.toString().length){  
        loanRepayDeadLine = loanRepayDeadLine + data
        return <div> the date in blocks is {loanRepayDeadLine.toString()}</div>
      } 
      
      return <div>none</div>
     
    } 
   
  const { address} = useAccount()

  const checkAddres = (address:Address | undefined)=>{
    if( address!== undefined && address.length){
        return <Balance address= {address} />
    }else{
      return <span>nope</span>
    }
    console.log(address)
  } 

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

   return ( <>
    <Cardcontainer/>
    {checkAddres(address)}
    <label>
        Select a value between 1 and 6:
        <select value={selectedValue} onChange={handleSelectChange}>
          {[1, 2, 3, 4, 5, 6].map((value) => (
            <option key={value} value={value.toString()}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => setShowResult(true)}>invocar</button>
      {showResult && handleGetBlockTime(selectedValue)}
    </> );
}
 
export default page;