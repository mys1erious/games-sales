import axios from 'axios';


const axiosSocialAuth = async(accessToken, backendType) => {
    let response = await axios.post(process.env.REACT_APP_BASE_API_URL+'/auth/convert-token/', {
        token: accessToken,
        backend: `${backendType}`,
        grant_type: "convert_token",
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
    });
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);

    return response;
};


export default axiosSocialAuth;
