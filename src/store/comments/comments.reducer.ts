import { ActionType } from '../types';
import { COMMENTS_ACTION_TYPES } from './comments.types';

const INITIAL_STATE: CommentsState = {};

export const commentsReducer = (state = INITIAL_STATE, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case COMMENTS_ACTION_TYPES.SET_COMMENTS:
      //@ts-ignore
      return { ...state, ...payload };
    default:
      return state;
  }
};

type CommentsState = { [key: string]: CommentsType };
export type CommentsType = {
  id: string;
  taskId: string;
  parentId: string;
  text: string;
}[];
