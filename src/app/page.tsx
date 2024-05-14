'use client'

import { useCreateSplit, useSplitEarnings, useSplitsClient } from '@0xsplits/splits-sdk-react'
import { useCallback, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, usePublicClient, useWalletClient } from 'wagmi'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  useSplitsClient({
    // TODO: why is this type wrong
    publicClient,
    walletClient,
  })

  const { createSplit, splitAddress, txHash, status: createStatus , error: createError } = useCreateSplit()
  const { isLoading, splitEarnings, status: dataStatus, error: dataError } = useSplitEarnings(8453, '0x6639fD5D6472Eb63B4aD65402E3330D07b3FA9D2', true, ['0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed'])

  const submitCreateSplit = useCallback(async () => {
    const args = {
      recipients: [
        {
          address: '0x39883c6E81e273f381BffE5a8c26c3A866Ff57Ca',
          percentAllocation: 50,
        },
        {
          address: '0x25ED37D355DF14013d24d75508CB7344aBB59814',
          percentAllocation: 50,
        }
      ],
      controller: '0x39883c6E81e273f381BffE5a8c26c3A866Ff57Ca',
      distributorFeePercent: 0,
    }

    const response = await createSplit(args)
    console.log(response)
  }, [createSplit])

  useEffect(() => {
    console.log({ txHash, createStatus, createError, splitAddress })
  }, [txHash, createStatus, createError])

  useEffect(() => {
    console.log({ isLoading, dataStatus, dataError, splitEarnings })
  }, [isLoading, dataStatus, dataError, splitEarnings])

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          address: {account.address}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      <div>
        <button onClick={submitCreateSplit}>
          Create split
        </button>
      </div>
    </>
  )
}

export default App
