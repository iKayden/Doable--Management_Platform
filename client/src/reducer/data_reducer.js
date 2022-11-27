export const SET_USERS = 'SET_USERS';
export const SET_PROJECTS = 'SET_PROJECTS';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const ADD_PROJECT = 'ADD_PROJECT';
export const SET_PROJECT = 'SET_PROJECT';
export const REMOVE_TASK = 'REMOVE_TASK';
export const SET_TASKS = 'SET_TASKS';

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
        loading: false,
      };
    case REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== action.id),
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.project, ...state.projects],
      };
    case SET_PROJECT:
      return {
        ...state,
        projectId: action.id,
      };
      case REMOVE_TASK:
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== action.id),
        };
        case SET_TASKS:
          return {
            ...state,
            tasks: action.tasks,
          };
    default:
      return state;
  }
};

export default dataReducer;
