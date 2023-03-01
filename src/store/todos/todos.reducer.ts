import {
  CreateTodoStart,
  DeleteTodoStart,
  EditTodoStart,
  FetchTodosFailure,
  GetTodosStart,
  FetchTodosSuccess,
} from './todos.action';
import { TodosData } from './todos.saga';
import { TODOS_ACTION_TYPES } from './todos.types';

const INITIAL_STATE: ToDosState = {
  todos: {},
  error: null,
  isLoading: false,
};

export const todosReducer = (
  state = INITIAL_STATE,
  action: TodosActionTypes
): ToDosState => {
  switch (action.type) {
    case (TODOS_ACTION_TYPES.GET_TODOS_START,
    TODOS_ACTION_TYPES.DELETE_TODO_START,
    TODOS_ACTION_TYPES.EDIT_TODO_START,
    TODOS_ACTION_TYPES.CREATE_TODO_START):
      return { ...state, isLoading: true };
    case TODOS_ACTION_TYPES.FETCH_TODOS_SUCCESS:
      return { ...state, isLoading: false, todos: action.payload };
    case TODOS_ACTION_TYPES.FETCH_TODOS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export type ToDosState = {
  todos: TodosData;
  error: Error | null;
  isLoading: boolean;
};

export type TodosActionTypes =
  | GetTodosStart
  | EditTodoStart
  | CreateTodoStart
  | DeleteTodoStart
  | FetchTodosSuccess
  | FetchTodosFailure;
