import axios from 'axios';

import { SET_PROJECT } from '../reducer/data_reducer';

export const getTasksForProject = (dispatch, id) => {
  return axios.get(`/api/tasks/?projectId=${id}`).then(() => {
    dispatch({
      type: SET_PROJECT,
      id,
    });
  });
};
