import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectCommentsSlice = (state: RootState) => state.comments;

export const selectAllComments = createSelector(
  [selectCommentsSlice],
  (commentsSlice) => commentsSlice.comments
);
