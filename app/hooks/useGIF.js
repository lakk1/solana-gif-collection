import React, { useEffect, useState } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from '../utils/idl.json';
import kp from '../utils/keypair.json';
const { SystemProgram, Keypair } = web3;

// Create a keypair for the account that will hold the GIF data.
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: 'processed',
};

const useGIFHook = () => {
  if (typeof window === 'undefined') {
    return {};
  }
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);

  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new Provider(connection, window.solana, opts.preflightCommitment);
  const program = new Program(idl, programID, provider);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log('Connected with Public Key:', response.publicKey.toString());

          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendGif = async () => {
    if (inputValue.length === 0) {
      console.log('No gif link given!');
      return;
    }
    setInputValue('');
    console.log('Gif link:', inputValue);
    try {
      await program.rpc.addGif(inputValue, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log('GIF successfully sent to program', inputValue);

      await getGifList();
    } catch (error) {
      console.log('Error sending GIF:', error);
    }
  };

  const upVote = async (gifItem) => {
    try {
      await program.rpc.voteGif(gifItem, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log('upvote to GIF');

      await getGifList();
    } catch (error) {
      console.log('Error  Upvoting GIF:', error);
    }
  };
  const deleteGif = async (gifItem) => {
    try {
      console.log(gifItem.gifLink);
      await program.rpc.deleteGif(gifItem.gifLink, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log('delete  GIF');

      await getGifList();
    } catch (error) {
      console.log('Error deleting GIF:', error);
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to Wallet
    </button>
  );

  const getGifList = async () => {
    try {
      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);

      console.log('Got the account', account);
      setGifList(account.gifList);
    } catch (error) {
      console.log('Error in getGifList: ', error);
      setGifList(null);
    }
  };

  const createGifAccount = async () => {
    try {
      await program.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log('Created a new BaseAccount w/ address:', baseAccount.publicKey.toString());
      await getGifList();
    } catch (error) {
      console.log('Error creating BaseAccount account:', error);
    }
  };

  // UseEffects
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');
      getGifList();
    }
  }, [walletAddress]);

  return {
    walletAddress,
    connectWallet,
    createGifAccount,
    gifList,
    upVote,
    deleteGif,
    sendGif,
  };
};

export default useGIFHook;
