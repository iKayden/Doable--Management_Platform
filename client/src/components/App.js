import './App.css';
import { useReducer, useState } from 'react';
import Login from './Login';
import UserList from './UserList';
import ProjectList from './ProjectList';

import { ApplicationContext, defaultState } from '../hooks/useApplicationData';
import dataReducer from '../reducer/data_reducer';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [state, dispatch] = useReducer(dataReducer, defaultState);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="App">
      <ApplicationContext.Provider value={{ state, dispatch }}>
        <h1>Users</h1>
        <ul>
          <UserList />
        </ul>
        <h1>Projects</h1>
        <ul>
          <ProjectList />
        </ul>
      </ApplicationContext.Provider>
    </div>
  );
};

export default App;
