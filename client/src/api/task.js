import axios from 'axios';

export const getTasksForProject = (id) => {
  return axios.get(`/api/tasks/?projectId=${id}`)
    .then((result) => result.data);
};

// export const deleteTask = (dispatch, id) => {
//   return axios.delete(`/api/projects/:id/tasks/${id}`)
//     .then(() => {
//       dispatch({
//         // type: REMOVE_TASK ???
//           id,
//       });
//     });
// };
