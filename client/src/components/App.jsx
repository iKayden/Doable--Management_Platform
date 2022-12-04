import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Home';
import Login from './Login';
import AllProjects from './AllProjects';
import ChatPage from './Chat/ChatPage';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ApplicationContext, defaultState } from '../hooks/useApplicationData';
import { useReducer } from 'react';
import dataReducer from '../reducer/data_reducer';
import TaskList from './TaskList';
import io from 'socket.io-client';
import { redirect } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

const socket = io.connect('http://localhost:3001');

const App = () => {
  const [state, dispatch] = useReducer(dataReducer, defaultState);
  const user = localStorage.getItem('user');
  const userName = localStorage.getItem('userName');
  const userAvatar = localStorage.getItem('userAvatar');

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('user');
    window.location.reload();
    return redirect('/login');
  };

  const router = createBrowserRouter([
    {
      element: (
        <>
          <header className="header">
            <Navbar variant="dark">
              <Container className="nav-bar">
                <LinkContainer to="/">
                  <Navbar.Brand>
                    <img
                      className="logo"
                      src="/doable_logo_new.png"
                      alt="logo"
                    />
                    <text className="nav-bar__doable">DOABLE</text>
                  </Navbar.Brand>
                </LinkContainer>
                {user ? (
                  <Nav>
                    <Tooltip title={`This is me! A ${userName}!`} arrow>
                      <img src={userAvatar} alt={userName} className="avatar" />
                    </Tooltip>
                    <NavDropdown title={userName} id="basic-nav-dropdown">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                      <LinkContainer to="/projects">
                        <NavDropdown.Item>Project History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item>Setting</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <LinkContainer to="/logout">
                        <NavDropdown.Item onClick={handleLogout}>
                          Log Out
                        </NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  </Nav>
                ) : (
                  ''
                )}
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
          element: <Login socket={socket} />,
        },
        {
          path: '/projects',
          element: <AllProjects />,
        },
        {
          path: '/projects/:id/tasks',
          element: <TaskList projectId={state.projectId} />,
        },
        {
          path: '/chat',
          element: <ChatPage socket={socket} />,
        },
        {
          path: '/logout',
        },
        {
          path: '/about',
          element: <h1>Placeholder page for about us page</h1>,
        },
        {
          path: '/contact',
          element: <h1>Placeholder page for contact us page</h1>,
        },
      ],
    },
  ]);

  return (
    <ApplicationContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router}></RouterProvider>
    </ApplicationContext.Provider>
  );
};

export default App;
