import { useState } from 'react';
import { ethers } from 'ethers';

function App() {

  // Properties

  const [walletAddress, setWalletAddress] = useState(undefined);
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

  function resetState() {
    setWalletAddress(undefined);
    setSignature(undefined);
    setMembraneCode(undefined);
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
    <div className="w-full h-full flex justify-center items-center">
      <div className="block w-full lg:w-1/3 flex flex-col justify-center bg-gray-200 rounded-md p-8">
        {!walletAddress &&
          <button className="bg-green-500 rounded-md hover:shadow-md p-5 font-bold text-3xl text-white"
            onClick={requestAccount}
          >Connect Ethereum Wallet</button>
        }

        {walletAddress && !signature &&
          <>
            <div className="mb-8">
              <h2 className="text-lg font-bold leading-10 text-gray-800">Your wallet address: </h2>
              <div className="text-sm text-gray-500">{walletAddress}</div>
            </div>
            <div class="flex flex-col justify-center mb-8">
              <label for="code" className="text-lg font-bold leading-10 text-gray-800">Holochain Cell Membrane Proof: </label>
              <input name="code" type="text" className="bg-gray-100 p-2 border-black border-2" onChange={(e) => setMembraneCode(e.target.value)} />
            </div>
            <button className="bg-blue-500 rounded-md hover:shadow-md p-5 font-bold text-3xl text-white" onClick={signMessage} >Sign Message</button>
          </>
        }
        {membraneCode && signature &&
          <div class="flex flex-col justify-center">
            <label for="code" className="text-lg font-bold leading-10 text-gray-800">Your Signature:</label>
            <textarea name="code" type="text" className="bg-gray-100 p-2 border-black border-2 h-64" value={signature} />
            <button className="mt-2 p-1 bg-gray-100 inline-block w-12 mx-auto " onClick={resetState}>Clear</button>
          </div>}
      </div>
    </div >
  );
}

export default App;
