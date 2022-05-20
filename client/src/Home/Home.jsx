import React from "react";
import { Link } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';

import "./Home.css";

const Home = () => {
  const [roomName, setRoomName] = React.useState("");
  const { publicKey } = useWallet();

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="home-container">
      {publicKey && publicKey.toBase58()}
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/${roomName}`} className="enter-room-button">
        Join room
      </Link>
      {publicKey && <WalletDisconnectButton bg="green" />}
    </div>
  );
};

export default Home;
