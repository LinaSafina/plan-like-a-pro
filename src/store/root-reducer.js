import { combineReducers } from 'redux';

import { todosReducer } from './todos/todos.reducer';
import { projectsReducer } from './projects/projects.reducer';

export const rootReducer = combineReducers({
  projects: projectsReducer,
  todos: todosReducer,
});
