import axios from 'axios';

import { ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT } from '../reducer/data_reducer';

export const createProject = (dispatch, project) => {
  return axios.post('/api/projects', project)
    .then((response) => {
      const { data } = response;
      dispatch({
        type: ADD_PROJECT,
        project: data.project,
      });
    });
};

export const updateProject = (dispatch, project) => {
  return axios.put(`/api/projects/${project.id}`, project)
    .then(() => {
      dispatch({
        type: UPDATE_PROJECT,
        project
      });
    });
};

export const deleteProject = (dispatch, id) => {
  return axios.delete(`/api/projects/${id}`)
    .then(() => {
      dispatch({
        type: REMOVE_PROJECT,
        id,
      });
    });
};
