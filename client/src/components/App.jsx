import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import Login from './Login';
import AllProjects from './AllProjects';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from 'react-router-dom';
import Home from './Home';
import { ApplicationContext, defaultState } from '../hooks/useApplicationData';
import { useReducer } from 'react';
import dataReducer from '../reducer/data_reducer';
import TaskList from './TaskList';
import { getProjects } from '../api/project';
import io from "socket.io-client";
import ChatPage from './Chat/ChatPage';

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [state, dispatch] = useReducer(dataReducer, defaultState);

  const router = createBrowserRouter([
    {
      element: (
        <>
          <header>
            <Navbar bg="primary" variant="dark">
              <Container className="nav-bar">
                <LinkContainer to="/">
                  <Navbar.Brand>Doable</Navbar.Brand>
                </LinkContainer>
                <Nav>
                  <LinkContainer to="/projects">
                    <Nav.Link>Project History</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/about">
                    <Nav.Link>About Us</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/ask">
                    <Nav.Link>Ask Us</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Container>
            </Navbar>
          </header>
          <Outlet />
        </>
      ),
      children: [
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
        {
          path: `/chat`,
          element: <ChatPage socket={socket} />
        }
      ],
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
      <RouterProvider router={router}></RouterProvider>
    </ApplicationContext.Provider>
  );
};

export default App;
