import axios from 'axios';

import { REMOVE_TASK } from '../reducer/data_reducer';

export const getTasksForProject = (id) => {
  return axios.get(`/api/tasks/?projectId=${id}`)
    .then((result) => result.data);
};

export const deleteTask = (dispatch, id) => {
  return axios.delete(`/api/tasks/${id}`)
    .then(() => {
      dispatch({
        type: REMOVE_TASK,
        id,
      });
    })
    .catch((err) => console.log(err.message));
};