import { RootState } from '../store';

//@ts-ignore
export const selectAllTodos = (state: RootState) => state.todos.todos;
