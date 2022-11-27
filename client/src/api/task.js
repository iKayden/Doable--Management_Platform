import axios from 'axios';

export const getTasksForProject = (id) => {
  return axios.get(`/api/tasks/?projectId=${id}`)
    .then((result) => result.data);
};
