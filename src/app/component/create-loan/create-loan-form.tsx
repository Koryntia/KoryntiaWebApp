import React, { useState } from 'react'

import feedsFinder from '../functions/findFees';

type LoanFormProps = {
    name: string;
    value: string;
};

const CreateLoanForm = () => {

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
                        <option value="USD">USD</option>
                        <option value="USDC">USDC</option>
                        <option value="LINK">LINK</option>
                        <option value="ETH">ETH</option>
                    </select> 
                    </div>
                </div>
                <div>
                    <label htmlFor="">Loan period</label>

                    <div className='bg-slate-100 rounded-xl flex'>                   
                    <input type="number" required  className='p-2 m-2 bg-slate-200 rounded-md'/>
                    <select name="" id="" className='bg-slate-100 h-10'>
                        <option value="USD">Month</option>
                        <option value="USDC">Year</option>
                    </select> 
                    </div>
                </div>
                <input type="text" />
            </form>
            </div>
        </section>
        </>
    )
}

export default CreateLoanForm