import React from "react";
import {GoogleOAuthProvider, useGoogleLogin} from "@react-oauth/google";
import axiosSocialAuth from "../../../lib/axiosSocialAuth";
import AuthButton from "./AuthButton";


const GoogleAuthButton = ({text}) => {
    const onSuccess = async(res) => {
        console.log(res.access_token);
        const backendRes = await axiosSocialAuth(res.access_token, 'google-oauth2');
        console.log(backendRes);
    };

    const onError = (res) => {
        console.log(res);
    };

    const login = useGoogleLogin({
        onSuccess: onSuccess,
        onError: onError,
        flow: 'implicit'
    });

    return(
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
            <AuthButton onClick={() => login()} text={text}/>
        </GoogleOAuthProvider>
    )
};


export default GoogleAuthButton;
