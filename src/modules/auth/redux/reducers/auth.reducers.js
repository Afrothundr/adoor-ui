
import { SET_AUTH_TOKEN } from '../actions/auth.action.types';
import intialState from '../../../../redux/store/intial-state';

export default function authReducer(state = intialState.auth, action) {
    switch (action.type) {
      case SET_AUTH_TOKEN:
        return {...state, token: action.token};
    //   case LOG_OUT:
    //     return state.filter(bookmark => bookmark.id !== action.payload.id);
      default:
        return state;
    }
  }