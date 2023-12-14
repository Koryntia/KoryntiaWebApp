"use client"
import Cardcontainer from "@/app/component/common/Cards/cardcontainer";
import feedsFinder from "@/app/component/functions/findFees";
import { FC } from "react";
import { Address, useAccount} from "wagmi";
import Balance from "@/app/component/functions/BalanceFinder";

interface pageProps {
    
}
 
const page: FC<pageProps> = () => {
  const { address} = useAccount()
  const checkAddres = (address:Address | undefined)=>{
    if( address!== undefined && address.length){
        return <Balance address= {address} />
    }
    console.log(address)
  } 
   return ( <>
    <Cardcontainer/>
    {checkAddres(address)}
    </> );
}
 
export default page;