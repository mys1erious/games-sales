import axiosInstance from "lib/axiosInstance";
import axios from "axios";


export const convertSocialAuthToken = async(accessToken, backendType) => {
    return await axios.post(process.env.REACT_APP_BASE_API_URL+'/auth/convert-token/', {
        token: accessToken,
        backend: `${backendType}`,
        grant_type: "convert_token",
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
    });
};

export const googleSignIn = async(googleResponse) => {
    return await convertSocialAuthToken(
        googleResponse.access_token,
        'google-oauth2'
    );
};

export const emailSignIn = async(email, password) => {
    axiosInstance.defaults.headers['Authorization'] = null;
    return await axiosInstance.post('/auth/token/',
        {
            username: email,
            password,
            grant_type: 'password',
            client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
            client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET
        });
};

const revokeToken = async(tokenType) => {
    axiosInstance.defaults.headers['Authorization'] = null;
    return await axiosInstance.post('/auth/revoke-token/', {
        token: localStorage.getItem(tokenType),
        token_type_hint: tokenType,
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET
    });
};

export const signOut = async() => {
    await revokeToken('access_token');
    await revokeToken('refresh_token');
};

export const signUp = async(username, email, password, passwordConfirmation) => {
    axiosInstance.defaults.headers['Authorization'] = null;
    axiosInstance.defaults.timeout = 10000;
    return await axiosInstance.post('/auth/signup/', {
        username, email, password,
        password_confirmation: passwordConfirmation
    });
};
