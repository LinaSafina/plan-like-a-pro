import { all, call, put, takeLatest } from 'typed-redux-saga';
import { apiUrl, METHODS, sendHttpRequest } from '../../api/api';
import {
  CreateCommentStart,
  deleteCommentFailure,
  DeleteCommentStart,
  fetchCommentsFailure,
  fetchCommentsStart,
  FetchCommentsStart,
  fetchCommentsSuccess,
} from './comments.action';
import { CommentsType } from './comments.reducer';
import { COMMENTS_ACTION_TYPES } from './comments.types';

export type CommentsData = {
  [key: string]: { parentId: string; taskId: string; text: string };
};

//workers
export function* fetchCommentsAsync(action: FetchCommentsStart) {
  try {
    const { parentId } = action.payload;
    const data = yield* call(
      sendHttpRequest,
      null,
      `${apiUrl}/comments.json?orderBy="parentId"&&equalTo="${parentId}"`
    );

    const loadedData: { [key: string]: CommentsType } = {};

    for (let key in data) {
      if (loadedData[parentId]) {
        loadedData[parentId].push({
          id: key,
          ...data[key],
        });
      } else {
        loadedData[parentId] = [
          {
            id: key,
            ...data[key],
          },
        ];
      }
    }

    yield* put(fetchCommentsSuccess(loadedData));
  } catch (error) {
    yield* put(fetchCommentsFailure(error as Error));
  }
}

export function* deleteCommentAsync(action: DeleteCommentStart) {
  try {
    const { parentId, id } = action.payload;
    yield* call(
      sendHttpRequest,
      { method: METHODS.DELETE },
      `${apiUrl}/comments/${id}.json`
    );

    yield* put(fetchCommentsStart(parentId));
  } catch (error) {
    yield* put(deleteCommentFailure(error as Error));
  }
}

export function* createCommentAsync(action: CreateCommentStart) {
  try {
    const { parentId, body } = action.payload;
    yield* call(sendHttpRequest, { body }, `${apiUrl}/comments.json`);

    yield* put(fetchCommentsStart(parentId));
  } catch (error) {
    yield* put(deleteCommentFailure(error as Error));
  }
}

//watchers
export function* onCommentsFetch() {
  yield* takeLatest(
    COMMENTS_ACTION_TYPES.FETCH_COMMENTS_START,
    fetchCommentsAsync
  );
}

export function* onCommentDeletion() {
  yield* takeLatest(
    COMMENTS_ACTION_TYPES.DELETE_COMMENT_START,
    deleteCommentAsync
  );
}

export function* onCommentCreation() {
  yield* takeLatest(
    COMMENTS_ACTION_TYPES.CREATE_COMMENT_START,
    createCommentAsync
  );
}

export function* commentsSaga() {
  yield* all([
    call(onCommentsFetch),
    call(onCommentDeletion),
    call(onCommentCreation),
  ]);
}

// export const getComments = async (parentId) => {
//   const data = await sendHttpRequest(
//     null,
//     `${apiUrl}/comments.json?orderBy="parentId"&&equalTo="${parentId}"`
//   );

//   const loadedData = {};

//   for (let key in data) {
//     if (loadedData[parentId]) {
//       loadedData[parentId].push({
//         id: key,
//         ...data[key],
//       });
//     } else {
//       loadedData[parentId] = [
//         {
//           id: key,
//           ...data[key],
//         },
//       ];
//     }
//   }

//   return loadedData;
// };

// export const sendComment = async (body, parentId) => {
//   const data = await sendHttpRequest({ body }, `${apiUrl}/comments.json`);

//   return await getComments(parentId);
// };

// export const deleteComment = async (id, parentId) => {
//   const data = await sendHttpRequest(
//     { method: 'DELETE' },
//     `${apiUrl}/comments/${id}.json`
//   );

//   return await getComments(parentId);
// };
