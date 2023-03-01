import { ActionWithPayload, createAction } from '../utils';
import { CommentsType } from './comments.reducer';
import { COMMENTS_ACTION_TYPES } from './comments.types';

export type CreateCommentStart = ActionWithPayload<
  COMMENTS_ACTION_TYPES.CREATE_COMMENT_START,
  { body: unknown; parentId: string }
>;

// export type CreateCommentSuccess =
//   Action<COMMENTS_ACTION_TYPES.CREATE_COMMENT_SUCCESS>;

export type CreateCommentFailure = ActionWithPayload<
  COMMENTS_ACTION_TYPES.CREATE_COMMENT_FAILURE,
  Error
>;

export type DeleteCommentStart = ActionWithPayload<
  COMMENTS_ACTION_TYPES.DELETE_COMMENT_START,
  { parentId: string; id: string }
>;

// export type DeleteCommentSuccess =
//   Action<COMMENTS_ACTION_TYPES.DELETE_COMMENT_SUCCESS>;

export type DeleteCommentFailure = ActionWithPayload<
  COMMENTS_ACTION_TYPES.DELETE_COMMENT_FAILURE,
  Error
>;

export type FetchCommentsStart = ActionWithPayload<
  COMMENTS_ACTION_TYPES.FETCH_COMMENTS_START,
  { parentId: string }
>;

export type FetchCommentsSuccess = ActionWithPayload<
  COMMENTS_ACTION_TYPES.FETCH_COMMENTS_SUCCESS,
  { [key: string]: CommentsType }
>;

export type FetchCommentsFailure = ActionWithPayload<
  COMMENTS_ACTION_TYPES.FETCH_COMMENTS_FAILURE,
  Error
>;

export const createCommentStart = (
  body: unknown,
  parentId: string
): CreateCommentStart =>
  createAction(COMMENTS_ACTION_TYPES.CREATE_COMMENT_START, { body, parentId });

export const createCommentFailure = (error: Error): CreateCommentFailure =>
  createAction(COMMENTS_ACTION_TYPES.CREATE_COMMENT_FAILURE, error);

export const deleteCommentStart = (
  parentId: string,
  id: string
): DeleteCommentStart =>
  createAction(COMMENTS_ACTION_TYPES.DELETE_COMMENT_START, { parentId, id });

// export const deleteCommentSuccess = (comments: {
//   [key: string]: CommentsType;
// }): DeleteCommentSuccess =>
//   createAction(COMMENTS_ACTION_TYPES.DELETE_COMMENT_SUCCESS, comments);

export const deleteCommentFailure = (error: Error): DeleteCommentFailure =>
  createAction(COMMENTS_ACTION_TYPES.DELETE_COMMENT_FAILURE, error);

export const fetchCommentsStart = (parentId: string): FetchCommentsStart =>
  createAction(COMMENTS_ACTION_TYPES.FETCH_COMMENTS_START, { parentId });

export const fetchCommentsSuccess = (comments: {
  [key: string]: CommentsType;
}): FetchCommentsSuccess =>
  createAction(COMMENTS_ACTION_TYPES.FETCH_COMMENTS_SUCCESS, comments);

export const fetchCommentsFailure = (error: Error): FetchCommentsFailure =>
  createAction(COMMENTS_ACTION_TYPES.FETCH_COMMENTS_FAILURE, error);
