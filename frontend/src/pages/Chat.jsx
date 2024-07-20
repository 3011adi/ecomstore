import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async (event) => {
    event.preventDefault();

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    const response = await axios.post('/chat', { message: input });
    setMessages([...messages, { text: response.data.message, sender: 'bot' }]);
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <p key={index}><strong>{message.sender}:</strong> {message.text}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;