import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './App.css';
import Login from './Login';
import ProjectList from './ProjectList';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Home';
import { ApplicationContext, defaultState } from '../hooks/useApplicationData';
import { useReducer } from 'react';
import dataReducer from '../reducer/data_reducer';
import TaskList from './TaskList';

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
      element: <ProjectList />,
    },
    {
      path: `/projects/:id/tasks`,
      element: <TaskList projectId={state.projectId} />,
    },
  ]);

  return (
    <ApplicationContext.Provider value={{ state, dispatch }}>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Doable</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
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
