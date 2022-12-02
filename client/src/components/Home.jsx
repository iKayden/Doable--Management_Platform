import "./Home.css";
import { useState, useEffect } from "react";
import Login from "./Login";
import ProjectList from "./ProjectList";

import { useApplicationState } from "../hooks/useApplicationData";

const Home = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const { projects } = useApplicationState();
  const filteredProjects = projects.filter(
    (project) => !project.completion_time
  );


  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="App">

      <ul>
        <ProjectList projects={filteredProjects} />
      </ul>
    </div>
  );
};

export default Home;
