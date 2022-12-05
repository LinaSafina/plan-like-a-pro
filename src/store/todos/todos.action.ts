import { ToDoType } from '../../components/modal/types';
import { createAction } from '../../util';
import { TODOS_ACTION_TYPES } from '../todos/todos.types';

export const setTodos = (todos: ToDoType[]) =>
  createAction(TODOS_ACTION_TYPES.SET_TODOS, todos);
