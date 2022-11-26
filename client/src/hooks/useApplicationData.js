import { createContext, useContext } from 'react';

export const defaultState = {
  // should we have tasks here too? Trying to delete
  users: [],
  projects: [],
  projectId: undefined,
  loading: true,
};

export const ApplicationContext = createContext({
  dispatch: () => { },
  state: defaultState,
});

export const useApplicationState = () => useContext(ApplicationContext).state;

export const useApplicationDispatch = () =>
  useContext(ApplicationContext).dispatch;
