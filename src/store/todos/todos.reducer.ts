import { ToDoType } from '../../components/modal/types';
import { ActionType } from '../types';
import { TODOS_ACTION_TYPES } from './todos.types';

const INITIAL_STATE: ToDosState = { queue: [], progress: [], completed: [] };

export const todosReducer = (state = INITIAL_STATE, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case TODOS_ACTION_TYPES.SET_TODOS:
      console.log(payload);
      return payload;
    default:
      return state;
  }
};

export type ToDosState = {
  queue?: ToDoType[];
  progress?: ToDoType[];
  completed?: ToDoType[];
};
