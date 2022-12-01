import "./Home.css";
import { useState, useEffect } from "react";
import Login from "./Login";
import UserList from "./UserList";
import ProjectList from "./ProjectList";
import io from "socket.io-client";
import { useApplicationState } from "../hooks/useApplicationData";
const socket = io.connect("http://localhost:3001");

const Home = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const { projects } = useApplicationState();
  const filteredProjects = projects.filter(
    (project) => !project.completion_time
  );

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
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message.."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
      <ul>
        <ProjectList projects={filteredProjects} />
      </ul>
    </div>
  );
};

export default Home;
