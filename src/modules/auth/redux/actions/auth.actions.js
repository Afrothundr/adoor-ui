import { LOG_IN, LOG_OUT, SET_AUTH_TOKEN } from './auth.action.types';
import axios from 'axios';
import { environment } from '../../../../environments';


// export const login = (userEmail, userPassword) => {
//     return { type: LOG_IN, email: userEmail, password: userPassword}
// }

export const setAuthToken = token => {
    return {type: SET_AUTH_TOKEN, token}
}

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
        return adoorApi.post('', { query: LOGIN })
            .then(result => {
                const token = result.data.data.sellerLogin;
                dispatch(setAuthToken(token))
            })
    }
};
