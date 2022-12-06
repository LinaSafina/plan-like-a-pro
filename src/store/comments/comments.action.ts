import { createAction } from '../../util';
import { CommentsType } from './comments.reducer';
import { COMMENTS_ACTION_TYPES } from './comments.types';

export const setComments = (comments: CommentsType) =>
  createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, comments);
