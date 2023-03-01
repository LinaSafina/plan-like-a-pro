import { all, call, put, takeLatest } from 'typed-redux-saga';
import { sendHttpRequest } from '../../api/api';
import { PROJECTS_ACTION_TYPES } from './projects.types';
import { apiUrl } from '../../api/api';
import { fetchProjectsFailure, fetchProjectsSuccess } from './projects.action';

export type ProjectsData = { [key: string]: { name: string } };

//workers
function* fetchProjectsAsync() {
  try {
    const data = yield* call(sendHttpRequest, null, `${apiUrl}/projects.json`);

    yield* put(fetchProjectsSuccess(data));
  } catch (error) {
    yield* put(fetchProjectsFailure(error as Error));
  }
}

//watchers
function* onProjectsFetch() {
  yield* takeLatest(
    PROJECTS_ACTION_TYPES.FETCH_PROJECTS_START,
    fetchProjectsAsync
  );
}

export function* projectsSaga() {
  yield* all([call(onProjectsFetch)]);
}
