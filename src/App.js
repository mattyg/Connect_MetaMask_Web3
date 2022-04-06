import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

function App() {

  // Properties

  const [walletAddress, setWalletAddress] = useState("");
  const [signature, setSignature] = useState("");

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
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()

      const newSignature = await signer.signMessage("Hello World");
      setSignature(newSignature);
    }
  }

  return (
    <div className="App">
      <main className="App-body">
        <button
          onClick={requestAccount}
        >Request Account</button>
        <h3>Wallet Address: {walletAddress}</h3>
        <div>
          <button
            onClick={signMessage}
          >Sign Message</button>
          <h3>Signature: {signature}</h3>
        </div>
      </main>
    </div>
  );
}

export default App;
