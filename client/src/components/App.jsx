import { useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './App.css';
import Login from './Login';
import AllProjects from './AllProjects';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Home';
import { ApplicationContext, defaultState } from '../hooks/useApplicationData';
import { useReducer } from 'react';
import dataReducer from '../reducer/data_reducer';
import TaskList from './TaskList';
import { getProjects } from '../api/project';

const App = () => {
  const [state, dispatch] = useReducer(dataReducer, defaultState);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/projects',
      element: <AllProjects />,
    },
    {
      path: `/projects/:id/tasks`,
      element: <TaskList projectId={state.projectId} />,
    },
  ]);

  const userId = localStorage.getItem('user');
  useEffect(() => {
    if (userId) {
      getProjects(dispatch, userId);
    }
  }, [userId]);

  return (
    <ApplicationContext.Provider value={{ state, dispatch }}>
      <Navbar bg="primary" variant="dark">
        <Container className="nav-bar">
          <Navbar.Brand href="/">Doable</Navbar.Brand>
          <Nav>
            <Nav.Link href="/projects">Project History</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/ask">Ask Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <RouterProvider router={router} />
    </ApplicationContext.Provider>
  );
};

export default App;
