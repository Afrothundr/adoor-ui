import * as actions from './dashboard.action.types';
import * as moment from 'moment';
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
                id
                firstName
                lastName
                phoneNumber
                bio
                email
                company
                profilePicture
                title
                listings {
                    id
                    pictures
                    address
                    city
                    zipcode
                    price
                    lowPrice
                    highPrice
                    squareFootage
                    bedrooms
                    bathrooms
                    heating
                    cooling
                    kitchenType
                    laundry
                    description
                    views
                    created
                    updated
                    matches {
                        id
                    }
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
                        headers: { 'Authorization': "bearer " + getState().authReducer.token }
                    }
                );
            dispatch(profileLoading(false));
            if (!result.data.errors) {
                const expiredListings = [];
                const validListings = [];
                result.data.data.seller.listings.forEach(listing => {
                    if (moment.utc(listing.updated).isBefore(moment().subtract(30, 'days'))) {
                        expiredListings.push(listing);
                    } else {
                        validListings.push(listing);
                    }
                });
                dispatch(setProfile({
                    ...result.data.data.seller,
                    listings: validListings,
                    expiredListings: expiredListings
                }));
            }
        } catch (err) {
            console.log(err);
            dispatch(profileLoading(false));
            dispatch(profileLoadFailure());
        }
    }
};

export const uploadProfile = profile => {
    const adoorApi = axios.create({
        baseURL: environment.API_BASE_URL
    });

    const UPDATE_SELLER = `
    mutation {
        updateSeller(
            update: {
                firstName: "${profile.firstName}",
                lastName: "${profile.lastName}",
                phoneNumber: "${profile.phoneNumber}",
                bio: "${profile.bio}",
                email: "${profile.email}",
                company: "${profile.company}",
                profilePicture: "${profile.profilePicture}",
                title: "${profile.title}",
            },
            apiKey: "${environment.API_KEY}"
        ) {
            firstName
            lastName
            phoneNumber
            bio
            email
            company
            profilePicture
            title
            listings {
                id
            }
        }
    }`;

    return async (dispatch, getState) => {
        dispatch(profileLoading(true));
        try {
            const result = await adoorApi.post(
                '',
                { query: UPDATE_SELLER },
                {
                    headers: { 'Authorization': "bearer " + getState().authReducer.token }
                });
            dispatch(profileLoading(false));
            if (!result.data.errors) {
                dispatch(setProfile(result.data.data.updateSeller))
            }
        } catch (err) {
            console.log(err);
            dispatch(profileLoading(false));
            dispatch(profileLoadFailure());
        }

    }
}

export const clearProfile = () => ({
    type: actions.CLEAR_PROFILE
});

export const loadListings = () => {
    const adoorApi = axios.create({
        baseURL: environment.API_BASE_URL

    });
    const LOAD_LISTINGS = `
        {
            seller
            {
                listings {
                    id
                    pictures
                    address
                    city
                    zipcode
                    price
                    lowPrice
                    highPrice
                    squareFootage
                    bedrooms
                    bathrooms
                    heating
                    cooling
                    kitchenType
                    laundry
                    description
                    views
                    created
                    updated
                    fireplace
                    yearBuilt
                    renovatedYear
                    matches {
                        id
                    }
                }
            }
        }
    `;

    return async (dispatch, getState) => {
        // dispatch(profileLoading(true));
        try {
            const result = await adoorApi
                .post(
                    '',
                    { query: LOAD_LISTINGS },
                    {
                        headers: { 'Authorization': "bearer " + getState().authReducer.token }
                    }
                );
            // dispatch(profileLoading(false));
            if (!result.data.errors) {
                const expiredListings = [];
                const validListings = [];
                result.data.data.seller.listings.forEach(listing => {
                    if (moment.utc(listing.updated).isBefore(moment().subtract(30, 'days'))) {
                        expiredListings.push(listing);
                    } else {
                        validListings.push(listing);
                    }
                });
                dispatch(setListings(validListings));
                dispatch(setExpiredListings(expiredListings));
            }
        } catch (err) {
            console.log(err);
            // dispatch(profileLoading(false));
            // dispatch(profileLoadFailure());
        }
    }
};

export const setListings = listings => ({
    type: actions.SET_LISTINGS,
    listings
});

export const setExpiredListings = expiredListings => ({
    type: actions.SET_EXPIRED_LISTINGS,
    expiredListings
})

export const createListing = listing => {
    console.log(listing);
    const adoorApi = axios.create({
        baseURL: environment.API_BASE_URL

    });
    const CREATE_LISTING = `
    mutation {
        createListing(
        listing: {
            pictures: [${listing.pictures.map(val => `"${val}"`)}],
            description: "${listing.description}",
            address: "${listing.address}",
            city: "${listing.city}",
            zipcode: ${listing.zipcode},
            bedrooms: ${listing.bedrooms},
            bathrooms: ${listing.bathrooms},
            squareFootage: ${listing.squareFootage},
            price: ${Array.isArray(listing.price) ? listing.price.slice(2) : listing.price},
            yearBuilt: ${listing.yearBuilt},
            heating: "${listing.heating}",
            cooling: "${listing.cooling}",
            kitchenType: "${listing.kitchenType}",
            laundry: "${listing.laundry}",
            fireplace: ${listing.fireplace || false},
            priceHistory: [],
        }) {
            listings {
                id
                pictures
                address
                city
                zipcode
                price
                lowPrice
                highPrice
                squareFootage
                bedrooms
                bathrooms
                heating
                cooling
                kitchenType
                laundry
                description
                views
                created
                updated
                fireplace
                yearBuilt
                renovatedYear
                matches {
                    id
                }
            }
        }
    }
    `;

    return async (dispatch, getState) => {
        // dispatch(profileLoading(true));
        try {
            const result = await adoorApi
                .post(
                    '',
                    { query: CREATE_LISTING },
                    {
                        headers: { 'Authorization': "bearer " + getState().authReducer.token }
                    }
                );
            // dispatch(profileLoading(false));
            if (!result.data.errors) {
                const expiredListings = [];
                const validListings = [];
                result.data.data.seller.listings.forEach(listing => {
                    if (moment.utc(listing.updated).isBefore(moment().subtract(30, 'days'))) {
                        expiredListings.push(listing);
                    } else {
                        validListings.push(listing);
                    }
                });
                dispatch(setListings(validListings));
                dispatch(setExpiredListings(expiredListings));
            }
        } catch (err) {
            console.log(err);
            // dispatch(profileLoading(false));
            // dispatch(profileLoadFailure());
        }
    }

};

export const updateListing = (id, listing)  => {
    console.log(id);
    console.log(listing);
    const adoorApi = axios.create({
        baseURL: environment.API_BASE_URL
    });
    const UPDATE_LISTING = `
    mutation {
        updateListing(
            listingId: "${id}",
            listingUpdate: {
                pictures: [${listing.pictures.map(val => `"${val}"`)}],
                description: "${listing.description}",
                address: "${listing.address}",
                city: "${listing.city}",
                zipcode: ${listing.zipcode},
                bedrooms: ${listing.bedrooms},
                bathrooms: ${listing.bathrooms},
                squareFootage: ${listing.squareFootage},
                price: ${typeof listing.price === 'string' ? listing.price.slice(2) : listing.price},
                yearBuilt: ${listing.yearBuilt},
                renovatedYear: ${listing.renovatedYear},
                heating: "${listing.heating}",
                cooling: "${listing.cooling}",
                kitchenType: "${listing.kitchenType}",
                laundry: "${listing.laundry}",
                fireplace: ${listing.fireplace || false},
                lowPrice: ${0},
                highPrice: ${0}
            }) {
                    id
                    pictures
                    address
                    city
                    zipcode
                    price
                    lowPrice
                    highPrice
                    squareFootage
                    bedrooms
                    bathrooms
                    heating
                    cooling
                    kitchenType
                    laundry
                    description
                    views
                    created
                    updated
                    fireplace
                    yearBuilt
                    renovatedYear
                    matches {
                        id
                    }
            }
    }
    `;

    return async (dispatch, getState) => {
        // dispatch(profileLoading(true));
        try {
            const result = await adoorApi
                .post(
                    '',
                    { query: UPDATE_LISTING },
                    {
                        headers: { 'Authorization': "bearer " + getState().authReducer.token }
                    }
                );
            if (!result.data.errors) {
                dispatch(loadListings());
            }
        } catch (err) {
            console.log(err);
        }
    }
}