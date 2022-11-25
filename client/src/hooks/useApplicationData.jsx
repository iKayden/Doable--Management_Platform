import {
  useEffect,
  useReducer
} from 'react';
import dataReducer, {
  SET_USERS,
  SET_PROJECTS,
  REMOVE_PROJECT
} from '../reducer/data_reducer';
import axios from 'axios';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    projects: [],
    loading: true,
  });
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/users',
    })
      .then(({
        data
      }) => {
        console.log(data);
        dispatch({ //will return a new state
          type: SET_USERS,
          users: data
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/projects',
    })
      .then(({
        data
      }) => {
        console.log(data);
        dispatch({ //will return a new state
          type: SET_PROJECTS,
          projects: data
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteProject = (id) => {
    return axios.delete(`/api/projects/${id}`)
      .then(() => {
        dispatch({
          type: REMOVE_PROJECT,
          id
        });
      });
  };

  return {
    state,
    dispatch,
    deleteProject
  };
  // Trying to make data for projects

};

export default useApplicationData;
