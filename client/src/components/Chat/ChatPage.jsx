import { useEffect, useState } from "react";
import io from "socket.io-client";
import Login from "../Login";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import './ChatPage.css';


export default function ChatPage({ socket }) {
  //Initial Websocket Installation Guide code
  // const [messageReceived, setMessageReceived] = useState("");
  // const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("userName"));

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

  const loginHandler = (userName) => {
    console.log("USER NAME ===", userName);
    setUser(userName);
  };

  if (!user) {
    return <Login setUser={loginHandler} />;
  }

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
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
