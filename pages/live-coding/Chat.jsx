// Chat.js
import React, { useState, useEffect,useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../../components/context/userContext'
import { ThemeContext } from '../../components/context/themeContext';
const backendURL = import.meta.env.VITE_URL_BACKEND_DEVELOPMENT
const socket = io(backendURL);

const Chat = () => {
    const { user} = useContext(AuthContext)
      const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    socket.on('chatMessage', (message) => {
      setMessages((msgs) => [...msgs, message]);
    });
  }, []);

  const sendMessage = () => {
    if (message) {
      const msgToSend = { name: user?.userName, text: message }; // Attach user's name to the message
      socket.emit('chatMessage', msgToSend);
      setMessage('');
    }
  };

  useEffect(() => {
    const chatList = document.querySelector('.chatsList');
    if(chatList) {
      chatList.scrollTop = chatList.scrollHeight;
    }
  }, [messages]);
  return (
    <div style={{background: theme === "dark" ? "black" : "white", padding:"10px", borderRadius:"10px", border:"1px solid black"}}>
     <h2 style={{borderBottom:"1px solid black"}}>Live Chat</h2>
      <ul className='chatsList'>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.name}:</strong> {msg.text}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
      />
      <button onClick={sendMessage} style={{margin:"10px 0px"}}>Send</button>
    </div>
  );
};

export default Chat;
