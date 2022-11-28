import { useEffect, useState } from "react";
import io from "socket.io-client";
import Login from "../Login";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import './ChatPage.css';


export default function ChatPage({ socket }) {
  const [messageReceived, setMessageReceived] = useState("");
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [user, setUser] = useState(localStorage.getItem("user"));
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody />
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
