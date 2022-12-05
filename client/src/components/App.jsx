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
import { useReducer, useState } from 'react';
import dataReducer from '../reducer/data_reducer';
import TaskList from './TaskList';
import { redirect } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import AboutUsPage from './AboutUsPage';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [state, dispatch] = useReducer(dataReducer, defaultState);
  const userName = localStorage.getItem('userName');
  const userAvatar = localStorage.getItem('userAvatar');

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('user');
    setUser(undefined);
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
                    <span className="nav-bar__doable">DOABLE</span>
                  </Navbar.Brand>
                </LinkContainer>
                {user ? (
                  <Nav>
                    <i className="fa fa-search"></i>
                    <i className="fa-regular fa-bell"></i>
                    <Tooltip title={`This is me! A ${userName}!`} arrow>
                      <img src={userAvatar} alt={userName} className="avatar" />
                    </Tooltip>
                    <NavDropdown
                      align="end"
                      title={userName}
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                      <LinkContainer to="/projects">
                        <NavDropdown.Item>Project History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item>Settings</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <LinkContainer to="/">
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
          element: (
            <div className="App">
              <Home setUser={setUser} user={user} />
            </div>
          ),
        },
        {
          path: '/login',
          element: <Login setUser={setUser} />,
        },
        {
          path: '/projects',
          element: (
            <div className="App">
              <AllProjects />
            </div>
          ),
        },
        {
          path: '/projects/:id/tasks',
          element: (
            <div className="App">
              <TaskList projectId={state.projectId} />
            </div>
          ),
        },
        {
          path: '/chat',
          element: <ChatPage />,
        },
        {
          path: '/about',
          element: (
            <div className="App">
              <div className="outside-about-us__wrapper">
                <AboutUsPage />
              </div>
            </div>
          ),
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
