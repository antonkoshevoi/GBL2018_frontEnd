import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import rootSaga from './sagas';
import clientMiddleware from './middlewares/clientMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export default (history, apiClient) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer
    }),
    composeWithDevTools(
      applyMiddleware(
        clientMiddleware(apiClient),        
        routerMiddleware(history),
        sagaMiddleware
      )
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
