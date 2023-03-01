import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectProjectsSlice = (state: RootState) => state.projects;

export const selectAllProjects = createSelector(
  [selectProjectsSlice],
  (projectsSlice) => projectsSlice.projects
);

export const selectProjectsMap = createSelector(
  [selectAllProjects],
  (projects) => {
    const loadedData = [];

    for (let key in projects) {
      loadedData.push({
        id: key,
        ...projects[key],
      });
    }

    return loadedData;
  }
);
