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
  // const sendMessage = () => {
  //   socket.emit("send_message", { messages, room });
  // };

  // const joinRoom = () => {
  //   if (room !== "") {
  //     socket.emit("join_room", room);
  //   }
  // };

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  if (!user) {
    return <Login setUser={setUser} />;
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
