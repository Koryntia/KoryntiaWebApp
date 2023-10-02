import React, { useState } from 'react'
import { AiOutlineDollarCircle } from 'react-icons/ai';

type LoanFormProps = {
    name: string;
    value: string;
};

const CreateLoan = () => {

    const [requestAmountValue, setRequestAmountValue] = useState<LoanFormProps[]>([
        { name: 'USDC', value: '' },
        { name: '209730', value: '209730' },
        { name: '4849', value: '4849' },
        { name: '99494', value: '99494' },
    ]);
    const [loanPeriodValue, setLoanPeriodValue] = useState<LoanFormProps[]>([
        { name: '', value: '' },
        { name: '2 Years', value: '3' },
        { name: '3 Years', value: '4' },
        { name: '4 Years', value: '5' },
    ]);

    return (
        <section>
            <div className='w-full h-[181.15px] mx-auto'>
                <h3 className='text-textBlack font-semibold leading-[23.4px] my-2'>Create Loan position</h3>
                <div className=''>
                    <div className='request-amount'>
                        <h4 className='text-textBlack font-semibold my-1'>Request Amount</h4>
                        <div className='bg-gray-100 p-2 flex justify-between rounded-xl'>
                            <p className='text-textBlack'>3000.04</p>
                            <div className=''>
                                <span className='mr-2'>{'|'}</span>
                                <AiOutlineDollarCircle className="h-5 w-5 inline text-appColor1" />
                                <select name="requestAmount" id="requestAmount"
                                    className='bg-transparent 
                                    cursor-pointer focus:border-transparent outline-none'>
                                    {requestAmountValue.map((opt, idx) => (
                                        <option key={idx} value={opt.value}>{opt.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='loan-period '>
                        <h4 className='text-textBlack text-bold my-1'>Loan Period</h4>
                        <div className='bg-gray-100 p-2 flex justify-between rounded-xl'>
                            <p>1 Year</p>
                            <select name="loanPeriod" id="loanPeriod"
                                className='bg-transparent
                                focus:border-transparent outline-none 
                                cursor-pointer'>
                                {loanPeriodValue.map((period, idx) => (
                                    <option key={idx} value={period.value}>{period.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateLoan