import { all, call, put, takeLatest } from 'typed-redux-saga';
import {
  apiUrl,
  METHODS,
  sendHttpRequest,
  TO_DO_RELEVANCE,
  TO_DO_STATUS,
} from '../../api/api';
import { ToDoType } from '../../components/modal/types';
import {
  fetchTodosFailure,
  GetTodosStart,
  fetchTodosSuccess,
  EditTodoStart,
  getTodosStart,
  DeleteTodoStart,
  CreateTodoStart,
  ToDoStatusChange,
  todoStatusChange,
} from './todos.action';
import { TODOS_ACTION_TYPES } from './todos.types';

export type TodosData = {
  [key: string]: ToDoType;
};

//workers
export function* todoStatusChangeAsync(action: ToDoStatusChange) {
  try {
    const { id } = action.payload;
    yield* call(
      sendHttpRequest,
      { method: METHODS.PATCH, body: { relevance: TO_DO_RELEVANCE.EXPIRED } },
      `${apiUrl}/todos/${id}.json`
    );
  } catch (error) {
    yield* put(fetchTodosFailure(error as Error));
  }
}

export function* fetchTodosAsync(action: GetTodosStart) {
  const { projectId, filterValue } = action.payload;
  try {
    let data: TodosData = yield* call(
      sendHttpRequest,
      null,
      `${apiUrl}/todos.json?orderBy="projectId"&&equalTo="${projectId}"`
    );

    // const loadedData: Todos = { queue: [], progress: [], completed: [] };

    for (let key in data) {
      let isExpired = false;

      if (
        filterValue &&
        !key.toLowerCase().includes(filterValue) &&
        !data[key].title.toLowerCase().includes(filterValue)
      ) {
        console.log(data[key].title);
        delete data[key];
        continue;
      }

      if (
        data[key].status !== TO_DO_STATUS.COMPLETED &&
        data[key].relevance !== TO_DO_RELEVANCE.EXPIRED
      ) {
        isExpired =
          Date.today().compareTo(Date.parse(data[key].expiryDate)) > 0;

        if (isExpired) {
          yield* call(todoStatusChange, key);
          data[key].relevance = TO_DO_RELEVANCE.EXPIRED;
        }
      }

      // let loadedFiles = [];

      // for (let key2 in data[key].files) {
      //   loadedFiles.push({ id: key, name: data[key].files[key2] }.name);
      // }

      // loadedData[data[key].status].push({
      //   id: key,
      //   ...data[key],
      //   isExpired: data[key].isExpired ? true : isExpired,
      //   files: loadedFiles,
      // });
    }

    yield* put(fetchTodosSuccess(data));
  } catch (error) {
    yield* put(fetchTodosFailure(error as Error));
  }
}

function* createTodoAsync(action: CreateTodoStart) {
  const { todoData, projectId } = action.payload;

  try {
    yield* call(sendHttpRequest, { body: todoData });

    yield* put(getTodosStart(projectId));
  } catch (error) {
    yield* put(fetchTodosFailure(error as Error));
  }
}

function* editTodoAsync(action: EditTodoStart) {
  const { id, dataToEdit, projectId } = action.payload;
  try {
    yield* call(
      sendHttpRequest,
      { method: METHODS.PATCH, body: dataToEdit },
      `${apiUrl}/todos/${id}.json`
    );

    yield* put(getTodosStart(projectId));
  } catch (error) {
    yield* put(fetchTodosFailure(error as Error));
  }
}

function* deleteTodoAsync(action: DeleteTodoStart) {
  const { id, projectId } = action.payload;

  try {
    yield* call(
      sendHttpRequest,
      { method: METHODS.DELETE },
      `${apiUrl}/todos/${id}.json`
    );

    yield* put(getTodosStart(projectId));
  } catch (error) {
    yield* put(fetchTodosFailure(error as Error));
  }
}

//watchers
export function* onTodoStatusChange() {
  yield* takeLatest(
    TODOS_ACTION_TYPES.TODO_STATUS_CHECK,
    todoStatusChangeAsync
  );
}

export function* onTodosFetch() {
  yield* takeLatest(TODOS_ACTION_TYPES.GET_TODOS_START, fetchTodosAsync);
}

export function* onTodosCreation() {
  yield* takeLatest(TODOS_ACTION_TYPES.CREATE_TODO_START, createTodoAsync);
}

export function* onTodosEdition() {
  yield* takeLatest(TODOS_ACTION_TYPES.EDIT_TODO_START, editTodoAsync);
}

export function* onTodosDeletion() {
  yield* takeLatest(TODOS_ACTION_TYPES.DELETE_TODO_START, deleteTodoAsync);
}

export function* todosSaga() {
  yield* all([
    call(onTodosFetch),
    call(onTodosCreation),
    call(onTodosDeletion),
    call(onTodosEdition),
  ]);
}
