

import './App.css';
import {Main} from './components/main';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

function App() {
  function getLibrary(provider) {
    return new Web3(provider)
  }
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <Main/>
        </Web3ReactProvider>
    </div>
  );
}

export default App;
