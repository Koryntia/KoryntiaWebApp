import React, { ChangeEvent, useState } from 'react'

import feedsFinder from '../functions/findFees';
import { useBlockNumber } from 'wagmi';
import Summary from './Summary';
import LoanButton from './LoanButton';

type LoanFormProps = {
    name: string;
    value: string;
};

const CreateLoanForm = () => {

    const [showSummary, setShowSummary] = useState<boolean>(false);

    const handleShowSummary = () => {
        return setShowSummary(prevState => !prevState)
      } 

    const [selectedValue, setSelectedValue] = useState<string>('1');
    
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
      
      
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
      };

    return (
        <>
        <section>
            <div className='w-full h-[181.15px] mx-auto'>
            <h3 className='text-textBlack font-semibold leading-[23.4px] my-2'>Create Loan position</h3>
            <form action="" >
                <div>
                    <label htmlFor="">Request Amount</label>
                    <div className='bg-slate-100 rounded-xl'>                   
                    <input type="number" required  className='p-2 m-2 bg-slate-200 rounded-md'/>
                    <select name="" id="" className='bg-slate-100 h-10'>
                        <option value="ETH">USD</option>
                        <option value="USDC">USDC</option>
                        <option value="LINK">LINK</option>
                        <option value="USD">ETH</option>
                    </select> 
                    </div>
                </div>
                <div>
                    <label htmlFor="">Loan period</label>

                    <div className='bg-slate-100 rounded-xl flex'>                   
                    <span className='p-2 m-2 bg-slate-200 rounded-md w-60'>Payment in months</span>
                    <select className='bg-slate-100 h-10' value={selectedValue} onChange={handleSelectChange}>
                        {[1, 2, 3, 4, 5, 6,7,8,9,10,11,12].map((value) => (
                        <option key={value} value={value.toString()}>
                            {value}
                        </option> 
                        ))}
                    </select>
                    </div>

                </div>
            </form>
           
            </div>
            <div>
            {showSummary &&<Summary/> /*Here the inputs will be added to generate the loan calculations */} 
            </div>
            <div className="py-5" >
            { !showSummary &&
            <LoanButton
              title="Calculate Position"
              showSummary={showSummary}
              setShowSummary={setShowSummary}
              handleShowSummary={handleShowSummary}
            />}
             {showSummary  &&
            <div className="flex  gap-3">
            <button onClick={handleShowSummary}  className='bg-red-500  rounded-xl py-2 px-3 w-32 text-center text-white'>
              Cancel
            </button>
            </div> }
          </div>
        </section>
        </>
    )
}

export default CreateLoanForm