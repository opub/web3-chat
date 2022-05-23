import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Home/Home";
import ChatRoom from "./ChatRoom/ChatRoom";

import { clusterApiUrl } from '@solana/web3.js';
import { useWallet, ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletMultiButton,
    WalletDisconnectButton
} from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');

function PageContent() {
    const { publicKey } = useWallet();

    console.log("connected", publicKey);
    if(publicKey) {
        return (
            <div>
                <span id="wallet"><WalletDisconnectButton /></span>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/:roomId" element={<ChatRoom />} />
                    </Routes>
                </BrowserRouter>
            </div>
            );
    } else {
        return (
            <div>
                <span id="wallet"><WalletMultiButton /></span>
                <h1>Connect your Solana wallet to begin.</h1>
            </div>
        );
    }
}

function App() {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
      () => [
        new PhantomWalletAdapter()
      ], []
    );

    return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <PageContent />
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
    );
}

export default App;
