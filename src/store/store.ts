import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';

import { rootReducer } from './root-reducer';

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware())
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
