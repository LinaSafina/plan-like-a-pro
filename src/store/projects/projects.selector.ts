import { RootState } from '../store';

//@ts-ignore
export const selectAllProjects = (state: RootState) => state.projects.projects;
