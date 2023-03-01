import { combineReducers } from 'redux';

import { todosReducer } from './todos/todos.reducer';
import { projectsReducer } from './projects/projects.reducer';
import { commentsReducer } from './comments/comments.reducer';

export const rootReducer = combineReducers({
  projects: projectsReducer,
  todos: todosReducer,
  comments: commentsReducer,
});
