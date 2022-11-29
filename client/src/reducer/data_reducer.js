export const SET_USERS = 'SET_USERS';
export const SET_PROJECTS = 'SET_PROJECTS';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const ADD_PROJECT = 'ADD_PROJECT';
export const SET_PROJECT = 'SET_PROJECT';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const SET_TASKS = 'SET_TASKS';
export const EDIT_TASK = 'EDIT_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const CLOSE_EDIT_TASK = 'CLOSE_EDIT_TASK';
export const CLOSE_ADD_TASK = 'CLOSE_ADD_TASK';

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
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
      };
    case CLOSE_ADD_TASK:
      return {
        ...state,
        taskToAdd: undefined,
      };
    case UPDATE_TASK: // This sets the state with the updated task
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
        taskToEdit: undefined
      };
    case CLOSE_EDIT_TASK:
      return {
        ...state,
        taskToEdit: undefined

      };
    case EDIT_TASK: //This shows the model to edit model
      return {
        ...state,
        taskToEdit: action.task
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
