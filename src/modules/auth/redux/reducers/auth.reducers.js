
import { SET_AUTH_TOKEN, LOG_IN_FAILURE, LOG_OUT, LOG_IN_PENDING, CLEAR_AUTH_ERRORS } from '../actions/auth.action.types';
import intialState from '../../../../redux/store/intial-state';

export default function authReducer(state = intialState.auth, action) {
    switch (action.type) {
      case SET_AUTH_TOKEN:
        return {...state, token: action.token};
      case CLEAR_AUTH_ERRORS:
        return {...state, loginFailed: false};
      case LOG_IN_PENDING:
        return {...state, loginPending: action.isPending}
      case LOG_OUT:
        return intialState.auth;
      case LOG_IN_FAILURE: 
        return {...state, loginFailed: true }
      default:
        return state;
    }
  }