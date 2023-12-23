'use client'
import Image from 'next/image'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl';
import { useConnect, useEnsName, useAccount, useEnsAvatar, useDisconnect, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { getUserAccount } from '@/redux/actions/user-account-action';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import WalletConnect from '@/app/svg/WalletConnect';
import MetaMask from '@/app/svg/MetaMask';
import CoinBase from '@/app/svg/CoinBase';

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
  }, [dispatch]);

  console.log(address)
  return (
    <section className='bg-gray-200'>
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col md:w-[50%] w-full md:flex-row mx-3 md:mx-0'>
          <div className={`bg-white md:w-[55%] w-full p-8 ${window.innerWidth >= 768 ? 'md:rounded-l-lg' : 'rounded-t-lg'}`}>
            <div className='flex justify-center items-center mt-'>
              <div className='mt-' >
                <div className='flex items-center gap-2'>
                  <div className='h-6'>
                    <Image src={'/koryntia-logo.png'} alt="koryntia logo" className='' width={20} height={20} />
                  </div>
                  <h1 className='text-2xl font-medium text-dark'>Koryntia</h1>
                </div>
                <h2 className='text-2xl font-bold my-4 text-dark'>Get Started</h2>
                <p className='text-darkText text-base mb-4'>Select your wallet</p>
                <p className='text-base text-dark'>Connecting your wallet is like “logging in” to Web3.
                  Select your wallet from the options to get started.
                </p>
                <div className='mt-4 flex items-center'>
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
          <div className={`bg-appColor2 md:w-[45%] w-full 
                  p-6   ${window.innerWidth >= 768 ? 'md:rounded-r-lg' : 'rounded-b-lg'}`}
          >
            {isConnected ?
              <div className='flex flex-col flex-shrink'>
                {/* <img src={""} alt="ENS Avatar" />
                <div>{ensName ? `${ensName} (${address})` : address}</div>
                <div>Connected to {connector?.name}</div>
                <button onClick={disconnectWallet}>Disconnect</button> */}

                <div className="flex flex-col">
                  <span className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Connected to {connector?.name}</span>
                  <span className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Address: </span>
                  <span className="mb-1 text-sm font-medium text-gray-900 dark:text-white" style={{ lineBreak: "anywhere" }}> {ensName ? `${ensName} (${address})` : address}</span>
                  <div className="flex mt-4 space-x-3 md:mt-6">
                    <button onClick={disconnectWallet} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-appColor1 rounded-sm">Disconnect</button>
                  </div>
                </div>
              </div>
              :
              <div >
                {connectors.map((connector) => (
                  <button key={connector.id} onClick={() => connect({ connector })} className="flex cursor-pointer items-center w-full mb-2 bg-white text-black rounded-lg flex-row  hover:bg-gray-100">
                    <div className='rounded-l-lg px-3 py-2 bg-appColor1'>
                      {connector.name === 'MetaMask' && <MetaMask />}
                      {connector.name === 'Coinbase Wallet' && <CoinBase />}
                      {connector.name === 'WalletConnect' && <WalletConnect />}
                      {connector.name === 'Injected' && <WalletConnect />}
                    </div>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <span className="text-lg font-medium tracking-tight text-gray-900 ">{connector.name}</span>
                      {!connector.ready && ' (unsupported)'}
                      {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                    </div>
                  </button>
                ))}
                {error && <div>{error.message}</div>}
              </div>
            }
          </div>
        </div>
      </div>
    </section >
  )
}

export default Login