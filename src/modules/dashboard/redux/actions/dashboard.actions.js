import * as actions from './dashboard.action.types';
import axios from 'axios';
import { environment } from '../../../../environments';

export const profileLoading = isPending => ({
    type: actions.PROFILE_LOADING,
    isPending
});

export const profileLoadFailure = () => ({
    type: actions.PROFILE_LOAD_FAILURE
});

export const setProfile = profile => ({
    type: actions.SET_PROFILE,
    profile
})

export const loadProfile = () => {
    const adoorApi = axios.create({
        baseURL: environment.API_BASE_URL
        
    });
    const GET_PROFILE = `
        {
            seller
            {
                firstName
                lastName
                phoneNumber
                bio
                email
                company
                listings {
                    id
                }
            }
        }
    `;

    return async (dispatch, getState) => {
        dispatch(profileLoading(true));
        try {
            const result = await adoorApi
            .post(
                '',
                { query: GET_PROFILE },
                {
                    headers: {'Authorization': "bearer " + getState().authReducer.token}
                }
            );
            dispatch(profileLoading(false));
            if (!result.data.errors) {
                dispatch(setProfile(result.data.data.seller));
            }
        } catch (err) {
            console.log(err);
            dispatch(profileLoading(false));
            dispatch(profileLoadFailure());
        }
    }
}