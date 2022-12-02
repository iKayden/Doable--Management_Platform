import axios from 'axios';

import { REMOVE_TASK, ADD_TASK, UPDATE_TASK } from '../reducer/data_reducer';

export const getTasksForProject = (id) => {
  return axios.get(`/api/tasks/?projectId=${id}`).then((result) => result.data);
};

export const createTask = (dispatch, task) => {
  return axios.post('/api/tasks', task).then((response) => {
    const { data } = response;
    dispatch({
      type: ADD_TASK,
      task: data.task,
    });
  });
};

export const updateTask = (dispatch, task) => {
  return axios.put(`/api/tasks/${task.id}`, task).then(() => {
    dispatch({
      type: UPDATE_TASK,
      task,
    });
  });
};

export const deleteTask = (dispatch, id, status) => {
  return axios
    .delete(`/api/tasks/${id}`)
    .then(() => {
      dispatch({
        type: REMOVE_TASK,
        id,
        status,
      });
    })
    .catch((err) => console.log(err.message));
};
