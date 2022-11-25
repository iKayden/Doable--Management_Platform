// ASK MENTOR ABOUT THIS ONE
export const SET_USERS = 'SET_USERS';
export const SET_PROJECTS = 'SET_PROJECTS';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.projects,
        loading: false
      };
    case REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== action.id)
      };
    default:
      return state;
  }
};
export default dataReducer;
