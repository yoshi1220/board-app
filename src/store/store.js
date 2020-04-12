import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers/reducer.js';


export default function configureStore() {
  const logger = createLogger();
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  //storeの作成
  const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(logger, thunk))
  );

  return store
}