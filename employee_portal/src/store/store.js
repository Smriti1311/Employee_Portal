import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import RootReducer from './Reducers/RootReducer';

function logger({ getState }) {
  return next => action => {
    const returnValue = next(action)
    return returnValue
  }
}

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware, logger];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(RootReducer, preloadedState, composeWithDevTools(middlewareEnhancer));
  return store;
}