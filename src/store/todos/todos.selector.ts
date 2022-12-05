import { RootState } from '../store';

//@ts-ignore
export const selectAllTodos = (state: RootState) => state.todos;

//@ts-ignore
export const selectQueueToDos = (state: RootState) => state.todos.queue;

//@ts-ignore
export const selectProgressToDos = (state: RootState) => state.todos.progress;

//@ts-ignore
export const selectCompletedToDos = (state: RootState) => state.todos.completed;
