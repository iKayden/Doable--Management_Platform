import { useEffect, useRef, useState } from "react";
import Login from "../Login";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import './ChatPage.css';


export default function ChatPage({ socket }) {

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("userName"));
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages((prev) => {
        return [...prev, data];
      });
    });
  }, []);

  useEffect(() => {
    socket.emit('newUser', { userName: user, socketID: socket.id });
  }, [user]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Probable culprit //////////////
  useEffect(() => {
    socket.on('typingResponse', (data) => {
      setTypingStatus(data);
    });
  }, [socket]);
  ///////////////////////////////////////
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
          setTypingStatus={setTypingStatus}
        />
        <ChatFooter
          socket={socket}
          typingStatus={typingStatus}
          setTypingStatus={setTypingStatus}
        />
      </div>
    </div>

    // <input
    //   placeholder="Room Number..."
    //   onChange={(event) => {
    //     setRoom(event.target.value);
    //   }}
    // />
    // <button onClick={joinRoom}> Join Room</button>
    // <input
    //   placeholder="Message.."
    //   onChange={(event) => {
    //     setMessage(event.target.value);
    //   }}
    // />
    // <h1>Message:</h1>
    // <button onClick={sendMessage}>Send Message</button>
    // <ul>
    //   {messageReceived}
    // </ul>
  );
}
