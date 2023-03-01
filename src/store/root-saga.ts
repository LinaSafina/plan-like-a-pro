import { all, call } from 'typed-redux-saga';
import { commentsSaga } from './comments/comments.saga';
import { projectsSaga } from './projects/projects.saga';
import { todosSaga } from './todos/todos.saga';

export function* rootSaga() {
  yield* all([call(todosSaga), call(projectsSaga), call(commentsSaga)]);
}
