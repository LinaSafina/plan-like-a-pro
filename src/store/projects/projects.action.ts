import { Action, ActionWithPayload, createAction } from '../utils';
import { ProjectsData } from './projects.saga';
import { PROJECTS_ACTION_TYPES } from './projects.types';

export type FetchProjectsStart =
  Action<PROJECTS_ACTION_TYPES.FETCH_PROJECTS_START>;

export type FetchProjectsSuccess = ActionWithPayload<
  PROJECTS_ACTION_TYPES.FETCH_PROJECTS_SUCCESS,
  ProjectsData
>;

export type FetchProjectsFailure = ActionWithPayload<
  PROJECTS_ACTION_TYPES.FETCH_PROJECTS_FAILURE,
  Error
>;

export const fetchProjectsStart = (): FetchProjectsStart =>
  createAction(PROJECTS_ACTION_TYPES.FETCH_PROJECTS_START);

export const fetchProjectsSuccess = (
  projects: ProjectsData
): FetchProjectsSuccess =>
  createAction(PROJECTS_ACTION_TYPES.FETCH_PROJECTS_SUCCESS, projects);

export const fetchProjectsFailure = (error: Error): FetchProjectsFailure =>
  createAction(PROJECTS_ACTION_TYPES.FETCH_PROJECTS_FAILURE, error);
