import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

function App() {

  // Properties

  const [walletAddress, setWalletAddress] = useState("");
  const [signature, setSignature] = useState(undefined);
  const [membraneCode, setMembraneCode] = useState(undefined);

  // Helper Functions

  // Requests access to the user's META MASK WALLET
  // https://metamask.io
  async function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  // Sign a message
  async function signMessage() {
    if (typeof window.ethereum === 'undefined') return;
    if (!membraneCode) return;

    await requestAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()

    const newSignature = await signer.signMessage(membraneCode);
    setSignature(newSignature);
  }

  return (
    <div className="App">
      <main className="App-body">
        <div>
          {walletAddress ? <h3>Connected wallet address: {walletAddress}</h3>
            : <button
              onClick={requestAccount}
            >Connect Ethereum Wallet</button>
          }
        </div>

        {walletAddress &&
          <div>
            <h3>Enter Membrane Proof Code</h3>
            <input type="text" onChange={(e) => setMembraneCode(e.target.value)} />
          </div>
        }

        <div>
          {membraneCode &&
            <button
              onClick={signMessage}
            >Sign Message</button>
          }
          {signature &&
            <h3>Signature: {signature}</h3>}
        </div>
      </main>
    </div>
  );
}

export default App;
