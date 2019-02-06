import { combineReducers } from 'redux';
import authReducer from '../../modules/auth/redux/reducers/auth.reducers';


const rootReducer = combineReducers({
  authReducer
});

export default rootReducer;