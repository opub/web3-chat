import React from "react";
import { useParams } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';

import "./ChatRoom.css";
import useChat from "../useChat";

const ChatRoom = () => {
  const roomId = useParams().roomId;
  const { publicKey } = useWallet();
  const { messages, sendMessage } = useChat(roomId, publicKey.toBase58());
  const [newMessage, setNewMessage] = React.useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if(newMessage.trim().length > 0)
    {
        sendMessage(newMessage);
    }
    setNewMessage("");
  };

  const formatSender = (key) => {
    const pad = 5;
    const prefix = key.substring(0, pad);
    const suffix = key.substring(key.length - pad);
    return `${prefix}...${suffix}`;
  }

  const formatDate = (time) => {
    return new Date(time).toLocaleString();
  }

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message, i) => (
            <div key={i}>
                <div className={`message-item ${message.wasSent ? "sent-body" : "received-body"}`}>
                    {message.body}
                </div>
                <div className={`message-note ${message.wasSent ? "sent" : "received"}`}>
                    {formatSender(message.sender)} &nbsp;&nbsp;&nbsp;&nbsp;
                    {formatDate(message.date)}
                </div>              
            </div>
          ))}
        </div>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
