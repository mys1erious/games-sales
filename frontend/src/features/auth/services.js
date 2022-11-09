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
    delete axiosInstance.defaults.headers['Authorization'];
    const res = await convertSocialAuthToken(
        googleResponse.access_token,
        'google-oauth2'
    );

    if (res.status === 200) {
        axiosInstance.defaults.headers['Authorization'] =
            `${res.data.token_type} ${res.data.access_token}`;
    }

    return res;
};

export const emailSignIn = async (email, password) => {
    const res = await axiosInstance.post('/auth/token/', {
        username: email,
        password,
        grant_type: 'password',
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET
    }, {
        headers: {Authorization: null}
    }
    );

    if (res.status === 200)
        axiosInstance.defaults.headers['Authorization'] =
            `${res.data.token_type} ${res.data.access_token}`;

    return res;
};

const revokeToken = async (tokenType) => {
    return await axiosInstance.post('/auth/revoke-token/', {
        token: localStorage.getItem(tokenType),
        token_type_hint: tokenType,
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET
    }, {
        headers: {Authorization: null}
    });
};

export const signOut = async() => {
    await revokeToken('access_token');
    await revokeToken('refresh_token');
};

export const signUp = async(username, email, password, passwordConfirmation) => {
    return await axiosInstance.post('/auth/signup/', {
        username, email, password,
        password_confirmation: passwordConfirmation
    }, {
        timeout: 10000,
        headers: {Authorization: null}
    });
};
