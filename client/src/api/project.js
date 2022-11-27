import axios from 'axios';

import {
  ADD_PROJECT,
  REMOVE_PROJECT,
  UPDATE_PROJECT,
  SET_PROJECTS,
} from '../reducer/data_reducer';

export const createProject = (dispatch, project) => {
  return axios.post('/api/projects', project).then((response) => {
    const { data } = response;
    dispatch({
      type: ADD_PROJECT,
      project: data.project,
    });
  });
};

export const updateProject = (dispatch, project) => {
  return axios.put(`/api/projects/${project.id}`, project).then(() => {
    dispatch({
      type: UPDATE_PROJECT,
      project,
    });
  });
};

export const deleteProject = (dispatch, id) => {
  return axios.delete(`/api/projects/${id}`).then(() => {
    dispatch({
      type: REMOVE_PROJECT,
      id,
    });
  });
};

export const getProjects = (dispatch, userId) => {
  return axios({
    method: 'GET',
    url: `/api/projects/?userId=${userId}`,
  })
    .then(({ data }) => {
      dispatch({
        type: SET_PROJECTS,
        //list projects in reverse order so that new project is on the top
        projects: data.reverse(),
      });
    })
    .catch((err) => console.log(err));
};
