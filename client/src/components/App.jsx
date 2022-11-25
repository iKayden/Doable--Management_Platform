import './App.css';
import Login from './Login';
import ProjectList from './ProjectList';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import Home from './Home';
import ProjectListItem from './ProjectListItem';
import { ApplicationContext, defaultState } from '../hooks/useApplicationData';
import { useReducer } from 'react';
import dataReducer from '../reducer/data_reducer';
import TaskList from './TaskList';

const App = () => {

  const [state, dispatch] = useReducer(dataReducer, defaultState);
  // console.log("STATE PROJECTS", state);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/projects",
      element: <ProjectList />,
    },
    {
      path: `/projects/:id/tasks`,
      element: <TaskList projectId={state.projectId} />,
    },
  ]);

  return (
    <ApplicationContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />

    </ApplicationContext.Provider>
  );
};

export default App;
