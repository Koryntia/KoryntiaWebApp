'use client'
import { useTranslations } from 'next-intl';
import { useConnect } from 'wagmi'
import './connectionButton.css'
 
 export function ConnectButton() {
  const t = useTranslations('ConnectButton')
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
 
  return (
    <div className='connectionButton' >
        <ul className='flex'>
      {connectors.map((connector) => (
        <li  className='border'
          key={connector.id}
        >
         <button  onClick={() => connect({ connector })}  disabled={!connector.ready}>
           {connector.name}
           {!connector.ready && ' (unsupported)'}
           {isLoading &&
             connector.id === pendingConnector?.id &&
             t('pending')}
         </button>
        </li>
      ))}
     </ul>
      {error && <div className='connectionLink'>
        <a href="https://metamask.io" target="_blank">
        {t('reminder')}
            </a>
        </div>}
    </div>
  )
}