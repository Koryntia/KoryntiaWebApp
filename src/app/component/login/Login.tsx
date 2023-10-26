'use client'
import Image from 'next/image'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl';
import { useConnect, useEnsName, useAccount, useEnsAvatar, useDisconnect, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { getUserAccount } from '@/redux/actions/user-account-action';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const Login = () => {
    const t = useTranslations('ConnectButton');
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()

    const { address, connector, isConnected } = useAccount()
    // const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
    const { disconnect } = useDisconnect()

    const [AgreeToTermsOfServices, setAgreeToTermsOfServices] = useState<boolean>(false);

    const handleAgreement = (e: any) => setAgreeToTermsOfServices(e.target.checked);
    const disconnectWallet = () => {
        disconnect()
    }

    useEffect(() => {
        const fetchOneUser = async () => {
            try {
                // Assuming `dispatch` and `getUserAccount` are correctly defined
                const result = await dispatch(getUserAccount()).unwrap();
                console.log("result", result);
            } catch (err) {
                console.error("Error fetching user account:", err);
            }
        };

        // Call the fetchOneUser function inside the effect
        fetchOneUser();
    }, []);








    console.log(" address ",);



    return (
        <section className='bg-gray-200'>
            <div className='flex justify-center items-center h-screen'>
                <div className='flex flex-col md:flex-row   '>
                    <div className={`bg-white w-[360px] h-60 p-6 ${window.innerWidth >= 768 ? 'md:rounded-l-lg' : 'rounded-t-lg'}`}>
                        <div className='flex justify-center items-center mt-'>
                            <div className='mt-' >
                                <div className='flex items-center gap-2'>
                                    <div className='h-6'>
                                        <Image src={'/koryntia-logo.png'} alt="koryntia logo" className='' width={20} height={20} />
                                    </div>
                                    <h1 className='text-2xl font-bold mb-2 text-dark'>Koryntia</h1>
                                </div>
                                <h2 className='text-xl font-bold my-2 text-dark'>Get Started</h2>
                                <p className='text-darkText text-sm my-2'>Connect your wallet</p>
                                <p className='text-sm text-dark'>Connecting your wallet is like “logging in” to Web3.
                                    Select your wallet from the options to get started.
                                </p>
                                <div className='mt-2'>
                                    <input type="checkbox" name='termOfService'
                                        onChange={handleAgreement}
                                    />
                                    <label htmlFor="termOfService" className='text-dark text-sm ml-2'>
                                        Agree to <span className='text-appColor1'>Terms of services </span>
                                        and <span className='text-appColor1'> Privacy Policy</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-appColor1 w-[360px] md:w-60 h-60
                     p-6 ${window.innerWidth >= 768 ? 'md:rounded-r-lg' : 'rounded-b-lg'}`}
                    >
                        {isConnected ?
                            <div>
                                <img src={""} alt="ENS Avatar" />
                                <div>{ensName ? `${ensName} (${address})` : address}</div>
                                <div>Connected to {connector?.name}</div>
                                <button onClick={disconnectWallet}>Disconnect</button>
                            </div>
                            :
                            <div>
                                {connectors.map((connector) => (
                                    <button
                                        disabled={!connector.ready}
                                        key={connector.id}
                                        onClick={() => connect({ connector })}
                                    >
                                        {connector.name}
                                        {!connector.ready && ' (unsupported)'}
                                        {isLoading &&
                                            connector.id === pendingConnector?.id &&
                                            ' (connecting)'}
                                    </button>
                                ))}

                                {error && <div>{error.message}</div>}
                            </div>
                        }


                    </div>

                </div>
            </div>
        </section>
    )
}

export default Login