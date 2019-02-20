import * as actions from './auth.action.types';
import axios from 'axios';
import { environment } from '../../../../environments';


export const setAuthToken = token => {
    return { type: actions.SET_AUTH_TOKEN, token }
}

export const loginPending = isPending => ({
    type: actions.LOG_IN_PENDING,
    isPending
});

export const signUpPending = isPending => ({
    type: actions.SIGN_UP_PENDING,
    isPending
});

export const signUpFailure = () => ({
    type: actions.SIGN_UP_FAILURE
});

export const loginFailure = () => ({
    type: actions.LOG_IN_FAILURE
});

export const logOut = () => ({
    type: actions.LOG_OUT
});

export const clearAuthErrors = () => ({
    type: actions.CLEAR_AUTH_ERRORS
});

export const isEmailAvailable = availibility => ({
    type: actions.IS_EMAIL_AVAILABLE,
    availibility
});

export const login = (email, password) => {
    const adoorApi = axios.create({
        baseURL: environment.API_BASE_URL,
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

export const checkEmail = email => {
    const adoorApi = axios.create({
        baseURL: environment.API_BASE_URL
    });
    const CHECK_EMAIL = `
    {
        isSellerEmailAvailable(email: "${email}")
    }
    `;
    return dispatch => {
        return adoorApi.post('', { query: CHECK_EMAIL }).then(result => {
            dispatch(isEmailAvailable(result.data.data.isSellerEmailAvailable));
        }).catch(err => {
            console.log(err);
        });
    }
}

export const signUp = seller => {
    const adoorApi = axios.create({
        baseURL: environment.API_BASE_URL
    });
    const SIGN_UP = `
    mutation
    {
        createSeller(
        input: {
          firstName: "${seller.firstName}",
          lastName: "${seller.lastName}",
          email: "${seller.email}",
          password: "${seller.password}",
          phoneNumber: "${seller.phoneNumber}"
        }
        )
      {
        id
      }
    }
    `;
    return async dispatch => {
        dispatch(signUpPending(true));
        try {
            const result = await adoorApi.post('', { query: SIGN_UP });
            dispatch(signUpPending(false));
            if (!result.data.errors) {
                dispatch(login(seller.email, seller.password));
            }
        } catch (err) {
            console.log(err);
            dispatch(signUpPending(false));
            dispatch(signUpFailure());
        }
    }
}
