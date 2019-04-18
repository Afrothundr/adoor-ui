import { combineReducers } from 'redux';
import authReducer from '../../modules/auth/redux/reducers/auth.reducers';
import dashboardReducer from '../../modules/dashboard/redux/reducers/dashboard.reducers';


const rootReducer = combineReducers({
  authReducer,
  dashboardReducer
});

export default rootReducer;