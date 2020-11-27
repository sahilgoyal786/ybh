import {applyMiddleware, createStore, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'
// import rootReducer from "./reducers";

// const persistConfig = {
// key: 'root',
// storage,
// /*
// these reducers data will be available in store even after the app is restarted.
// clears on cache clearance.
// For account reducer, we only save user data
// */
// whitelist: ['account']
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({collapsed: true});
const middleware = applyMiddleware(logger, ReduxThunk);

const enhancer = composeEnhancers(middleware);

// export const reduxStore = createStore(persistedReducer, enhancer);
// export const persistor = persistStore(reduxStore);

// import { createStore } from "redux";
import rootReducer from '../redux/reducer';
// import storeConstants from './constants';
// const store = createStore(persistedReducer, storeConstants.DEF_STORE);
const store = createStore(rootReducer, {}, enhancer);
const getStore = () => store;

export {getStore};
export default {
  getStore,
};
