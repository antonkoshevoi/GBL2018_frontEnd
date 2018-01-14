import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import rootSaga from './sagas';
import clientMiddleware from "./middlewares/clientMiddleware";

export default (history, apiClient) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer
    }),
    applyMiddleware(
      clientMiddleware(apiClient),
      routerMiddleware(history),
      sagaMiddleware
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
