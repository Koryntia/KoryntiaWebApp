'use client'
//this function is used to get the time stamp of the blockchain
import React from 'react'
import { useBlockNumber } from 'wagmi'

const getBlockTimeStamp = () => { 
   
   const {data, isError, isLoading} = useBlockNumber()
     if(isLoading){
        return <div>Fetching block number</div>
     }
     if(isError){
        return <div>Error Fetching block number</div>
     }

     return <div>{data?.toString()}</div>
   } 
  

export default getBlockTimeStamp