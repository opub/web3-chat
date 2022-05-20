import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Home/Home";
import ChatRoom from "./ChatRoom/ChatRoom";

import { useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import {
    PhantomWalletAdapter,
    // getSolflareWallet,
    // getSolletWallet,
    // getSolletExtensionWallet
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');

function WalletNotConnected() {
    return (
        <div>
            <h1>
                Looks like your Solana wallet is not connnected. Connect a wallet to get started!
            </h1>
            <WalletMultiButton />
        </div>
    );
}

function App() {
    const { publicKey } = useWallet();
    const wallets = useMemo(
      () => [
        new PhantomWalletAdapter(),
        // getSolflareWallet(),
        // getSolletWallet({ network }),
        // getSolletExtensionWallet({ network }),
      ]
    );

    return (
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                {!publicKey && <WalletNotConnected />}
                <Router>
                    <Routes>
                        <Route exact path="/" element={Home} />
                        <Route exact path="/:roomId" element={ChatRoom} />
                    </Routes>
                </Router>
            </WalletModalProvider>
        </WalletProvider>
    );
}

export default App;
