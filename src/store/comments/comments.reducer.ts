import {
  CreateCommentFailure,
  CreateCommentStart,
  DeleteCommentStart,
  DeleteCommentFailure,
  FetchCommentsFailure,
  FetchCommentsStart,
  FetchCommentsSuccess,
} from './comments.action';
import { COMMENTS_ACTION_TYPES } from './comments.types';

const INITIAL_STATE: CommentsState = {
  comments: {},
  isLoading: false,
  error: null,
};

export const commentsReducer = (
  state = INITIAL_STATE,
  action: CommentsActionTypes
): CommentsState => {
  switch (action.type) {
    case (COMMENTS_ACTION_TYPES.FETCH_COMMENTS_START,
    COMMENTS_ACTION_TYPES.CREATE_COMMENT_START,
    COMMENTS_ACTION_TYPES.DELETE_COMMENT_START):
      return { ...state, isLoading: true };
    case COMMENTS_ACTION_TYPES.FETCH_COMMENTS_SUCCESS:
      return { ...state, isLoading: false, comments: action.payload };
    case (COMMENTS_ACTION_TYPES.FETCH_COMMENTS_FAILURE,
    COMMENTS_ACTION_TYPES.DELETE_COMMENT_FAILURE,
    COMMENTS_ACTION_TYPES.CREATE_COMMENT_FAILURE):
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export type CommentsState = {
  comments: { [key: string]: CommentsType };
  isLoading: boolean;
  error: Error | null;
};

export type CommentsType = {
  id: string;
  taskId: string;
  parentId: string;
  text: string;
}[];

export type CommentsActionTypes =
  | FetchCommentsFailure
  | FetchCommentsStart
  | FetchCommentsSuccess
  | CreateCommentFailure
  | CreateCommentStart
  | DeleteCommentFailure
  | DeleteCommentStart;
