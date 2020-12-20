import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import store from 'redux-persist/es/storage';

import tikunReducer from './tikun/tikun-reducer';

const persistConfig = {
  key: 'root',
  storage: store,
  whitelist: '',
};

const rootReducer = combineReducers({
  tikun: tikunReducer,
});

export default persistReducer(persistConfig, rootReducer);
