// ==== Root Reducer
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';

// import all reducers
import authReducer from './auth';
import loadingReducer from './loading';
import userReducer from './user';
import searchReducer from './search';
import chatReducer from './chat';
import historyReducer from './history';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth', 'loading', 'user', 'search', 'chat', 'history'],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  loading: loadingReducer,
  user: userReducer,
  search: searchReducer,
  chat: chatReducer,
  history: historyReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
