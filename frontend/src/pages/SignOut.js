import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";


const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = async() => {
        await axiosInstance.post('/auth/revoke_token/',{
            token: localStorage.getItem('refresh_token'),
            client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
            client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET
        });

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;

        navigate('/signin/');

        // Until user handling is not implemented
        window.location.reload();
    };

    useEffect(() => {
        handleSignOut();
    }, []);

    return(
        <div>Signing Out...</div>
    )
}


export default SignOut;
