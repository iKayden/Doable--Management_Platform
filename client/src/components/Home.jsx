import { useState, useEffect } from 'react';
import Login from './Login';
import ProjectList from './ProjectList';
import { getProjects } from '../api/project';
import {
  useApplicationDispatch,
  useApplicationState,
} from '../hooks/useApplicationData';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ setUser, user }) => {
  const dispatch = useApplicationDispatch();
  const { projects } = useApplicationState();
  const navigate = useNavigate();

  // Displays projects that are active
  const filteredProjects = projects.filter(
    (project) => !project.completion_time
  );

  // loads all projects when user is found
  const userId = localStorage.getItem('user');
  useEffect(() => {
    if (userId) {
      getProjects(dispatch, userId);
    }
  }, [userId]);

  // Checks if user is logged in
  if (!user) {
    return navigate('/login');
  }

  return <ProjectList projects={filteredProjects} title="Active Projects" />;
};

export default Home;
