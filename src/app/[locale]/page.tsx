'use client'
import { useState } from "react";

import CreateLoanForm from "../component/create-loan/create-loan-form";

import LoanButton from "../component/create-loan/LoanButton";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { decrement, increment } from '../../redux/features/count-slice';

import Summary from "../component/create-loan/Summary";

import { useAccount } from "wagmi";


export default function Home() {



  const {address} = useAccount();
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

 
  const handleAdd = () => {
    dispatch(increment())
  }
  const handleMinus = () => {
    dispatch(decrement())
  }
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const handleShowSummary = () => {
    return setShowSummary(prevState => !prevState)
  } 
 

  return (
    <section>
      <div className="flex w-full">
        <div className="dashboard-column-1 w-[900px] h-full">
          <h2>Right Column</h2>
          <h2>{count}</h2>
          <div>
            <button className="bg-green-300 p-2" onClick={handleAdd} >add</button> {"  "}
            <button className="bg-blue-300 p-2" onClick={handleMinus}>minus</button>
          </div>

        </div>
        <div className="dashboard-column-2 w-[330px] h-full">
          <div>
               <CreateLoanForm />
               {showSummary &&<Summary/>}
          </div>

        </div>



      </div>
    </section>
    
  )
}
