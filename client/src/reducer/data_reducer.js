export const SET_USERS = "SET_USERS";
export const SET_PROJECTS = "SET_PROJECTS";
export const REMOVE_PROJECT = "REMOVE_PROJECT";
export const ADD_PROJECT = "ADD_PROJECT";
export const SET_PROJECT = "SET_PROJECT";
export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const SET_TASKS = "SET_TASKS";
export const EDIT_TASK = "EDIT_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const CLOSE_EDIT_TASK = "CLOSE_EDIT_TASK";
export const TO_ADD_PROJ = "TO_ADD_PROJ";
export const CLOSE_ADD_PROJ = "CLOSE_ADD_PROJ";
export const CLOSE_ADD_TASK = 'CLOSE_ADD_TASK';
export const OPEN_ADD_TASK = 'OPEN_ADD_TASK';
export const OPEN_EDIT_TASK = 'OPEN_EDIT_TASK';
export const OPEN_UPDATE_PROJECT = 'OPEN_UPDATE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const CLOSE_UPDATE_PROJECT = 'CLOSE_UPDATE_PROJECT';

const dataReducer = (state, action) => {
  switch (action.type) {
    //======== PROJECT ACTIONS ==============
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
    case OPEN_UPDATE_PROJECT:
      return {
        ...state,
        projectToEdit: action.project
      };
    case UPDATE_PROJECT:
      const filteredProjects = state.projects.filter((project) => project.id !== action.project.id);
      return {
        ...state,
        projects: [action.project, ...filteredProjects],
        projectToEdit: undefined
      };
    case CLOSE_UPDATE_PROJECT:
      return {
        ...state,
        projectToEdit: undefined
      };
    case SET_PROJECT:
      return {
        ...state,
        projectId: action.id,
      };
    case TO_ADD_PROJ: // Shows add project modal
      return {
        ...state,
        projectToAdd: true,
      };
    case CLOSE_ADD_PROJ: // To close add project modal
      return {
        ...state,
        projectToAdd: undefined,
      };
    // ======= END OF PROJECT ACTIONS =========

    // ======= TASK ACTIONS ===================
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
      };
    case OPEN_ADD_TASK:
      return {
        ...state,
        taskToAdd: true

      };
    case CLOSE_ADD_TASK:
      return {
        ...state,
        taskToAdd: undefined,
      };
    case UPDATE_TASK: // This sets the state with the updated task
      const filteredTasks = state.tasks.filter((task) => task.id !== action.task.id);
      return {
        ...state,
        tasks: [action.task, ...filteredTasks],
        taskToEdit: undefined,
      };
    case CLOSE_EDIT_TASK:
      return {
        ...state,
        taskToEdit: undefined,
      };
    case OPEN_EDIT_TASK:
      return {
        ...state,
        taskToEdit: action.task
        //Points to the state that exists. Model will have full object access(truthy ref)
        // will populate/get state props aw well.
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

    // ========= END OF TASK ACTIONS ===========
    default:
      return state;
  }
};

export default dataReducer;
