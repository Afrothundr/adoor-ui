import * as actionType from '../actions/dashboard.action.types';
import intialState from '../../../../redux/store/intial-state';

export default function dashboardReducer(state = intialState.dashboard, action) {
    switch (action.type) {
        case actionType.PROFILE_LOADING:
            return { ...state, profilePending: action.isPending }
        case actionType.PROFILE_LOAD_FAILURE:
            return { ...state, profileLoadFailed: true }
        case actionType.SET_PROFILE:
            return { ...state, profile: action.profile }
        case actionType.CLEAR_PROFILE:
            return intialState.dashboard
        case actionType.SET_LISTINGS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    listings: action.listings
                }
            }
        case actionType.SET_EXPIRED_LISTINGS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    expiredListings: action.expiredListings
                }
            }
        case actionType.CLEAR_LISTINGS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    listings: [],
                    expiredListings: []
                }
            }
        default:
            return state;
    }
}