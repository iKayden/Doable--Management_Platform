import "./App.css";
import useApplicationData from "../hooks/useApplicationData";
import { useState } from "react";
import Login from "./login";

const App = () => {
  const { state, dispatch } = useApplicationData();

  const userList = state.users.map((user) => (
    <li key={user.id}>
      <p>{user.name}</p>
      <img class="user--avatar" src={user.avatar} alt="avatar" />
      <p>{user.email}</p>
      <hr />
    </li>
  ));

  const [cookie, setCookie] = useState();

  if (!cookie) {
    return <Login setCookie={setCookie} />;
  }

  return (
    <div className="App">

      <h1> Users </h1>
      <ul> {userList} </ul>
    </div>
  );
};

export default App;
