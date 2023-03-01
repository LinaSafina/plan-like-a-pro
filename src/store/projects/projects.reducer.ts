import {
  FetchProjectsFailure,
  FetchProjectsStart,
  FetchProjectsSuccess,
} from './projects.action';
import { ProjectsData } from './projects.saga';
import { PROJECTS_ACTION_TYPES } from './projects.types';

const INITIAL_STATE: ProjectsState = {
  projects: {},
  error: null,
  isLoading: false,
};

export const projectsReducer = (
  state = INITIAL_STATE,
  action: ProjectsActionTypes
): ProjectsState => {
  switch (action.type) {
    case PROJECTS_ACTION_TYPES.FETCH_PROJECTS_START:
      return { ...state, isLoading: true };
    case PROJECTS_ACTION_TYPES.FETCH_PROJECTS_SUCCESS:
      return { ...state, projects: action.payload, isLoading: false };
    case PROJECTS_ACTION_TYPES.FETCH_PROJECTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

type ProjectsState = {
  projects: ProjectsData;
  error: Error | null;
  isLoading: boolean;
};

type ProjectsActionTypes =
  | FetchProjectsStart
  | FetchProjectsSuccess
  | FetchProjectsFailure;
