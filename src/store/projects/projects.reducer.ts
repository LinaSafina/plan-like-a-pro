import { ProjectsType } from '../../pages/projects/types';
import { ActionType } from '../types';
import { PROJECTS_ACTION_TYPES } from './projects.types';

const INITIAL_STATE: ProjectsState = { projects: [] };

export const projectsReducer = (state = INITIAL_STATE, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case PROJECTS_ACTION_TYPES.SET_PROJECTS:
      return { projects: payload };
    default:
      return state;
  }
};

type ProjectsState = {
  projects: ProjectsType;
};
