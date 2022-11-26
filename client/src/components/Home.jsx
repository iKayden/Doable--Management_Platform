import './Home.css';
import { createContext, useReducer, useState } from 'react';
import Login from './Login';
import UserList from './UserList';
import ProjectList from './ProjectList';
import TaskList from './TaskList';
import { Link } from 'react-router-dom';


import { ApplicationContext, defaultState, useApplicationDispatch, useApplicationState } from '../hooks/useApplicationData';
import dataReducer from '../reducer/data_reducer';
import ProjectForm from './ProjectForm';
export const UserContext = createContext();

const Home = () => {
  // We need to figure out how to keep user in state after page refresh
  const [user, setUser] = useState(localStorage.getItem('user'));
  console.log("USER HOME", user);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Link to="/projects">
          <h1>Projects</h1>
        </Link>
        <ProjectForm />
        <ul>
          <ProjectList />
        </ul>
        <h1>Users</h1>
        <div className='user--list'>
          <UserList />
        </div>
      </div >
    </UserContext.Provider>
  );
};

export default Home;
