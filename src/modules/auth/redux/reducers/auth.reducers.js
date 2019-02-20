
import * as actionType from '../actions/auth.action.types';
import intialState from '../../../../redux/store/intial-state';

export default function authReducer(state = intialState.auth, action) {
    switch (action.type) {
      case actionType.SET_AUTH_TOKEN:
        return {...state, token: action.token};
      case actionType.CLEAR_AUTH_ERRORS:
        return {...state, loginFailed: false, isEmailAvailable: true};
      case actionType.LOG_IN_PENDING:
        return {...state, loginPending: action.isPending}
      case actionType.LOG_OUT:
        return intialState.auth;
      case actionType.LOG_IN_FAILURE: 
        return {...state, loginFailed: true }
      case actionType.IS_EMAIL_AVAILABLE:
        return {...state, isEmailAvailable: action.availibility}
      case actionType.SIGN_UP_PENDING: 
        return {...state, signUpPending: action.isPending};
      case actionType.SIGN_UP_FAILURE:
        return {...state, signUpFailed: true}
      default:
        return state;
    }
  }