import "./App.css";
import useApplicationData from "../hooks/useApplicationData";
import { useState } from "react";
import Login from "./Login";
import UserList from "./UserList";
import ProjectList from "./ProjectList";

const App = () => {

  const [user, setUser] = useState(localStorage.getItem("user"));

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (<div className="App" >
    <h1> Users </h1>
    <ul> <UserList /> </ul>
    <h1> Projects </h1>
    <ul> <ProjectList /> </ul>
  </div >
  );
};

export default App;