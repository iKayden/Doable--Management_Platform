import { useApplicationState } from '../hooks/useApplicationData';
import ProjectList from './ProjectList';
import Login from './Login';
import { useState } from 'react';

export default function AllProjects() {
  const { projects } = useApplicationState();
  const [user, setUser] = useState(localStorage.getItem("user"));

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return <ProjectList projects={projects} />;
}
