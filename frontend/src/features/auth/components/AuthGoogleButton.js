import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";

import {GoogleOAuthProvider, useGoogleLogin} from "@react-oauth/google";

import {setUserDataToLocalStorage, User} from "../utils";
import {googleSignIn} from "../services";
import {UserContext} from "../UserContext";
import AuthButton from "./AuthButton";


const AuthGoogleButtonLogic = ({children}) => {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    const onSuccess = async(googleResponse) => {
        const response = await googleSignIn(googleResponse);

            setUserDataToLocalStorage({
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token
            });
            setUser(User({
                email: '',
                isLoggedIn: true
            }));

        navigate('/');
    };

    const onError = (googleResponse) => {
        // Implement alert
        console.log(googleResponse);
    };

    const login = useGoogleLogin({
        onSuccess: response => onSuccess(response),
        onError: response => onError(response),
        flow: 'implicit'
    });

    return(
        <AuthButton onClick={login}>{children}</AuthButton>
    )
};

const AuthGoogleButton = ({children}) => {
    return(
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <AuthGoogleButtonLogic>{children}</AuthGoogleButtonLogic>
        </GoogleOAuthProvider>
    )
}


export default AuthGoogleButton;
