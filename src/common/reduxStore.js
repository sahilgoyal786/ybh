import {applyMiddleware, createStore, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({collapsed: true});
const middleware = applyMiddleware(logger, ReduxThunk);

const enhancer = composeEnhancers(middleware);

import rootReducer from '../redux/reducer';

const store = createStore(rootReducer, {}, enhancer);
const getStore = () => store;

export {getStore};
export default {
  getStore,
};
