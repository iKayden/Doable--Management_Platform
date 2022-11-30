import './Home.css';
import { useState } from 'react';
import Login from './Login';
import UserList from './UserList';
import ProjectList from './ProjectList';

import { useApplicationState } from '../hooks/useApplicationData';

const Home = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const { projects } = useApplicationState();
  const filteredProjects = projects.filter(
    (project) => !project.completion_time
  );
  console.log(filteredProjects);
  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="App">
      <ul>
        <ProjectList projects={filteredProjects} />
      </ul>
      <h1>Users</h1>
    </div>
  );
};

export default Home;
