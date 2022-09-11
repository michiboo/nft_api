import { CreateNFT } from './create'
import { useWeb3React } from "@web3-react/core"
import { injected } from "./connector"

export function Main() {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    async function connect() {
      try {
        await activate(injected)
      } catch (ex) {
        console.log(ex)
      }
    }
  
    async function disconnect() {
      try {
        deactivate()
      } catch (ex) {
        console.log(ex)
      }
    }
    return (
        <div>
        {active ? (
            <div>
             <div>Connected with <b>{account}</b></div>
             <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
            <CreateNFT />
            </div>
        ) :
          <div className="flex flex-col items-center justify-center">
            <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
            <span>Only support Chain ID 97 (BSC testnet) </span>
            <span>Not connected</span>
          </div>
        }
        </div>
    );
  }