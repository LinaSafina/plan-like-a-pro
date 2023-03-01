import { createSelector } from 'reselect';

import { TO_DO_STATUS } from '../../api/api';
import { ToDoWithId } from '../../components/modal/types';
import { RootState } from '../store';
import { TodosData } from './todos.saga';

export type Todos = {
  [key in TO_DO_STATUS]: ToDoWithId[];
};

export type TodosStatusUnion = `${TO_DO_STATUS}`;

function filterTodosByStatus(todos: TodosData, status: TodosStatusUnion) {
  let todosMap = [];
  for (let key in todos) {
    if (todos[key].status === status) {
      let loadedFiles = [];
      for (let key2 in todos[key].files) {
        loadedFiles.push({ id: key, name: todos[key].files[key2] }.name);
      }
      todosMap.push({
        id: key,
        ...todos[key],
        files: loadedFiles,
      });
    }
  }

  return todosMap;
}

export const selectTodosSlice = (state: RootState) => state.todos;

export const selectAllTodos = createSelector(
  [selectTodosSlice],
  (todosSlice) => todosSlice.todos
);

export const selectQueueToDos = createSelector([selectAllTodos], (todos) => {
  return filterTodosByStatus(todos, TO_DO_STATUS.QUEUE);
});

export const selectProgressToDos = createSelector([selectAllTodos], (todos) => {
  return filterTodosByStatus(todos, TO_DO_STATUS.IN_PROGRESS);
});

export const selectCompletedToDos = createSelector(
  [selectAllTodos],
  (todos) => {
    return filterTodosByStatus(todos, TO_DO_STATUS.COMPLETED);
  }
);
