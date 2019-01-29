import { LOG_OUT, SET_AUTH_TOKEN, LOG_IN_FAILURE, LOG_IN_PENDING } from './auth.action.types';
import axios from 'axios';
import { environment } from '../../../../environments';

export const setAuthToken = token => {
    return {type: SET_AUTH_TOKEN, token}
}

export const loginPending = isPending => ({
    type: LOG_IN_PENDING,
    isPending
});

export const loginFailure = () => ({
    type: LOG_IN_FAILURE
});

export const logOut = () => ({
    type: LOG_OUT
});

export const login = (email, password) => {
    const adoorApi = axios.create({
        baseURL: 'https://adoor-api.herokuapp.com/api',
    });
    const LOGIN = `
        mutation {
            sellerLogin(
                email: "${email}",
                password: "${password}",
                apiKey: "${environment.API_KEY}"
            )
        }
        `;
    return dispatch => {
        dispatch(loginPending(true));
        return adoorApi.post('', { query: LOGIN })
            .then(result => {
                dispatch(loginPending(false));
                if (!result.data.errors) {
                    const token = result.data.data.sellerLogin;
                    dispatch(setAuthToken(token));
                } else {
                    dispatch(loginPending(false));
                    dispatch(loginFailure());
                }
            }).catch(err => {
                dispatch(loginPending(false));
                dispatch(loginFailure());
                console.log(err);
            })
    }
};
