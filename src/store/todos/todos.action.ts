import { ToDoType } from '../../components/modal/types';
import { createAction } from '../../util';
import { TODOS_ACTION_TYPES } from '../todos/todos.types';
import { ToDosState } from './todos.reducer';

export const setTodos = (todos: ToDosState) =>
  createAction(TODOS_ACTION_TYPES.SET_TODOS, todos);
