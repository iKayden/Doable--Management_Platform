import axios from 'axios';

export const getTasksForProject = (id) =>
  axios.get(`/api/tasks/?projectId=${id}`).then((result) => result.data);
