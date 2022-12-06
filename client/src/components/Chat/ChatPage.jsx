import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

import Login from '../Login';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import './ChatPage.css';

export default function ChatPage() {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(localStorage.getItem('userName'));
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar'));
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const socket = io.connect('http://localhost:3001');
    setSocket(socket);
    return () => {
      socket.disconnect();
      setSocket();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('messageResponse', (data) => {
        setMessages((prev) => {
          return [...prev, data];
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit('newUser', {
        userName: user,
        socketID: socket.id,
        avatar: avatar,
      });
    }
  }, [user, socket, avatar]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (socket) {
      // Changes typing status to empty string after two seconds
      socket.on('typingResponse', (data) => {
        setTypingStatus(data);
        setTimeout(() => {
          setTypingStatus('');
        }, 2000);
      });
    }
  }, [socket]);

  const loginHandler = (userName) => {
    setUser(userName);
  };

  if (!user) {
    return <Login setUser={loginHandler} />;
  }

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          lastMessageRef={lastMessageRef}
          typingStatus={typingStatus}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
}
