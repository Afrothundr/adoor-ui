import { combineReducers } from 'redux';
import authReducer from './auth.reducers';

const rootReducer = combineReducers({
  authReducer
});

export default rootReducer;