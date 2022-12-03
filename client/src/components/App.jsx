import "./App.css";
import Home from "./Home";
import Login from "./Login";
import AllProjects from "./AllProjects";
import ChatPage from "./Chat/ChatPage";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ApplicationContext, defaultState } from "../hooks/useApplicationData";
import { useReducer } from "react";
import dataReducer from "../reducer/data_reducer";
import TaskList from "./TaskList";
import io from "socket.io-client";
import { redirect } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [state, dispatch] = useReducer(dataReducer, defaultState);
  const user = localStorage.getItem("user");
  const userName = localStorage.getItem("userName");
  
  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('user');
    window.location.reload();
    return redirect("/login");
  };
  
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
                  { user ? 
                            <><Navbar.Text>
                            Signed in as: {userName}
                          </Navbar.Text>
                          <LinkContainer to="/logout">
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </LinkContainer></> : ""}
                </Nav>
              </Container>
            </Navbar>
          </header>
          <Outlet />
        </>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login socket={socket} />,
        },
        {
          path: "/projects",
          element: <AllProjects />,
        },
        {
          path: `/projects/:id/tasks`,
          element: <TaskList projectId={state.projectId} />,
        },
        {
          path: `/chat`,
          element: <ChatPage socket={socket} />,
        },
        {
          path: `/logout`,
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
