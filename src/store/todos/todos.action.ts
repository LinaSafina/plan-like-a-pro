import { ActionWithPayload, createAction } from '../utils';
import { TODOS_ACTION_TYPES } from '../todos/todos.types';
import { TodosData } from './todos.saga';
import { ToDoType } from '../../components/modal/types';

export type ToDoStatusChange = ActionWithPayload<
  TODOS_ACTION_TYPES.TODO_STATUS_CHECK,
  { id: string }
>;

export type GetTodosStart = ActionWithPayload<
  TODOS_ACTION_TYPES.GET_TODOS_START,
  { projectId?: string; filterValue?: string }
>;

export type DeleteTodoStart = ActionWithPayload<
  TODOS_ACTION_TYPES.DELETE_TODO_START,
  { id: string; projectId?: string }
>;

export type EditTodoStart = ActionWithPayload<
  TODOS_ACTION_TYPES.EDIT_TODO_START,
  { id: string; dataToEdit: Partial<ToDoType>; projectId?: string }
>;

export type CreateTodoStart = ActionWithPayload<
  TODOS_ACTION_TYPES.CREATE_TODO_START,
  { todoData: ToDoType; projectId?: string }
>;

export type FetchTodosSuccess = ActionWithPayload<
  TODOS_ACTION_TYPES.FETCH_TODOS_SUCCESS,
  TodosData
>;

export type FetchTodosFailure = ActionWithPayload<
  TODOS_ACTION_TYPES.FETCH_TODOS_FAILURE,
  Error
>;

export const todoStatusChange = (id: string): ToDoStatusChange =>
  createAction(TODOS_ACTION_TYPES.TODO_STATUS_CHECK, {
    id,
  });

export const getTodosStart = (
  projectId?: string,
  filterValue?: string
): GetTodosStart =>
  createAction(TODOS_ACTION_TYPES.GET_TODOS_START, {
    projectId,
    filterValue,
  });

export const deleteTodoStart = (
  id: string,
  projectId?: string
): DeleteTodoStart =>
  createAction(TODOS_ACTION_TYPES.DELETE_TODO_START, {
    id,
    projectId,
  });

export const editTodoStart = (
  id: string,
  dataToEdit: Partial<ToDoType>,
  projectId?: string
): EditTodoStart =>
  createAction(TODOS_ACTION_TYPES.EDIT_TODO_START, {
    id,
    dataToEdit,
    projectId,
  });

export const createTodoStart = (
  todoData: ToDoType,
  projectId?: string
): CreateTodoStart =>
  createAction(TODOS_ACTION_TYPES.CREATE_TODO_START, {
    todoData,
    projectId,
  });

export const fetchTodosSuccess = (todos: TodosData): FetchTodosSuccess =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODOS_SUCCESS, todos);

export const fetchTodosFailure = (error: Error): FetchTodosFailure =>
  createAction(TODOS_ACTION_TYPES.FETCH_TODOS_FAILURE, error);
