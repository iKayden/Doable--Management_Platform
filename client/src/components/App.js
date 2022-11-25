import "./App.css";
import useApplicationData from "../hooks/useApplicationData";
import { useState } from "react";
import Login from "./login";

const App = () => {
  const {
    state,
    dispatch,
    deleteProject
  } = useApplicationData();

  const userList = state.users.map((user) => (
    <li key={user.id} >
      <p>
        {user.name}
      </p>
      <img className="user--avatar" src={user.avatar} alt="avatar" />
      <p>
        {user.email}
      </p>
      <hr />
    </li>
  ));
  const projectList = state.projects.map((project) => ( //name, description, start_date, expected_end_date
    <li key={project.id} >
      <p>
        {project.name}
      </p>
      <p>
        {project.description}
      </p>
      <p>
        {project.start_date}
      </p>
      <p>
        {project.expected_end_date}
      </p>
      <button onClick={() => { deleteProject(project.id); }}>Delete</button>
      <hr />
    </li>
  ));

  const [cookie, setCookie] = useState();

  if (!cookie) {
    return <Login setCookie={setCookie} />;
  }

  return (<div className="App" >
    <h1> Users </h1>
    <ul> {userList} </ul>
    <h1> Projects </h1>
    <ul> {projectList} </ul>
  </div >
  );
};

export default App;