import { ProjectsType } from '../../pages/projects/types';
import { createAction } from '../../util';
import { PROJECTS_ACTION_TYPES } from './projects.types';

export const setProjects = (projects: ProjectsType) =>
  createAction(PROJECTS_ACTION_TYPES.SET_PROJECTS, projects);
