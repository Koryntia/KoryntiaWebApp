import React from 'react'
import { AiOutlineDollarCircle } from 'react-icons/ai';

const CreateLoan = () => {
    return (
        <section>
            <div className='w-[278px] h-[181.15px] mx-auto'>
                <h3 className='text-textBlack font-semibold leading-[23.4px] my-2'>Create Loan position</h3>
                <div className=''>
                    <div className='request-amount'>
                        <h4 className='text-textBlack text-bold my-1'>Request Amount</h4>
                        <div className='bg-gray-100 p-2 flex justify-between rounded-xl'>
                            <p className='text-textBlack'>3000.04</p>
                            <div className=''>
                                <span className='mr-2'>{'|'}</span>
                                <AiOutlineDollarCircle className="h-5 w-5 inline text-appColor1" />
                                <select name="requestAmount" id="requestAmount" className='bg-transparent'>
                                    <option value="">USDC</option>
                                    <option value="">209730</option>
                                    <option value="">4849</option>
                                    <option value="">99494</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='loan-period '>
                        <h4 className='text-textBlack text-bold my-1'>Loan Period</h4>
                        <div className='bg-gray-100 p-2 flex justify-between rounded-xl'>
                            <p>1 Year</p>
                            <select name="loanPeriod" id="loanPeriod" className='bg-transparent'>
                                <option value="">{" "}</option>
                                <option value="">2 Years</option>
                                <option value="">3 Years</option>
                                <option value="">4 Years</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateLoan