'use client'
import { useConnect } from 'wagmi'
 
export function ConnectButton() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
 
  return (
    <div >
        <ul>
      {connectors.map((connector) => (
        <li  className=''
          key={connector.id}
        >
         <button onClick={() => connect({ connector })}  disabled={!connector.ready}>
           {connector.name}
           {!connector.ready && ' (unsupported)'}
           {isLoading &&
             connector.id === pendingConnector?.id &&
             ' (connecting)'}
         </button>
        </li>
      ))}
     </ul>
      {error && <div>
        <a href="https://metamask.io" target="_blank">
              Install MetaMask
            </a>
        </div>}
    </div>
  )
}
