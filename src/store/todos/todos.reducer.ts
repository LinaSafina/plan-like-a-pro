import { ToDoType } from '../../components/modal/types';
import { ActionType } from '../types';
import { TODOS_ACTION_TYPES } from './todos.types';

const INITIAL_STATE: ToDosState = { todos: [] };

export const todosReducer = (state = INITIAL_STATE, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case TODOS_ACTION_TYPES.SET_TODOS:
      return { todos: payload };
    default:
      return state;
  }
};

type ToDosState = {
  todos: ToDoType[];
};
