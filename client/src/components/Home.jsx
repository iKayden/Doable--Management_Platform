import "./Home.css";
import { useState, useEffect } from "react";
import Login from "./Login";
import ProjectList from "./ProjectList";
import { getProjects } from "../api/project";
import { useApplicationDispatch, useApplicationState } from "../hooks/useApplicationData";

const Home = () => {
  const dispatch = useApplicationDispatch();
  const { projects } = useApplicationState();
  const [user, setUser] = useState(localStorage.getItem("user"));

  // Displays projects that are active
  const filteredProjects = projects.filter(
    (project) => !project.completion_time
  );
  
  // loads all projects when user is found
  const userId = localStorage.getItem("user");
  useEffect(() => {
    if (userId) {
      getProjects(dispatch, userId);
    }
  }, [userId]);

  // Checks if user is logged in
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
