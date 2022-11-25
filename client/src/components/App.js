import "./App.css";
import useApplicationData from "../hooks/useApplicationData";
import { useState } from "react";
import Login from "./Login";
import UserList from "./UserList";
import ProjectList from "./ProjectList";

const App = () => {
  const {
    state,
    dispatch,
    deleteProject,
    createProject,
    editProject
  } = useApplicationData();

  // const userList = state.users.map((user) => (
  //   <li key={user.id} >
  //     <p>
  //       {user.name}
  //     </p>
  //     <img className="user--avatar" src={user.avatar} alt="avatar" />
  //     <p>
  //       {user.email}
  //     </p>
  //     <hr />
  //   </li>
  // ));
  // const projectList = state.projects.map((project) => ( //name, description, start_date, expected_end_date
  //   <li key={project.id} >
  //     <p>
  //       {project.name}
  //     </p>
  //     <p>
  //       {project.description}
  //     </p>
  //     <p>
  //       {project.start_date}
  //     </p>
  //     <p>
  //       {project.expected_end_date}
  //     </p>
  //     <button onClick={() => { deleteProject(project.id); }}>Delete</button>
  //     {/* <button onClick={() => { editProject(project.id); }}>Edit</button>  DO AN ID PAGE AND SET IT UP THERE*/}
  //     <hr />
  //   </li>
  // ));



  const [cookie, setCookie] = useState();
  const [project, setProject] = useState({});

  // if (!cookie) {
  //   return <Login setCookie={setCookie} />;
  //  } //
  //   <form
  //   autoComplete="off"
  //   onSubmit={(e) => {
  //     e.preventDefault();
  //     createProject(project);
  //   }} >
  //   <input type="text" name="name" placeholder="Enter Project Name" value={project.name} onChange={(event) => setProject((prev) => ({ ...prev, name: event.target.value }))} />
  //   <button type="submit">Add New Project</button>
  // </form>

  return (<div className="App" >
    <h1> Users </h1>
    <ul> <UserList /> </ul>
    <h1> Projects </h1>
    <ul> <ProjectList /> </ul>
  </div >
  );
};

export default App;
