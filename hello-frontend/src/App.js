import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // 获取所有消息
  useEffect(() => {
    axios.get('http://localhost:5001/api/message')
      .then(response => {
        setMessages(response.data); // 设置获取到的消息
      })
      .catch(error => {
        console.error('Error fetching the messages:', error);
      });
  }, []);

  // 处理输入框变化
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  // 提交新消息
  const handleSubmit = () => {
    if (newMessage.trim()) {
      axios.post('http://localhost:5001/api/message', { text: newMessage })
        .then(response => {
          setMessages([...messages, response.data]); // 更新消息列表
          setNewMessage(''); // 清空输入框
        })
        .catch(error => {
          console.error('Error posting the message:', error);
        });
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Enter a message"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
