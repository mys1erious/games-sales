import React from "react";
import {useGoogleLogin} from "@react-oauth/google";
import AuthButton from "./AuthButton";
import {useNavigate} from "react-router-dom";
import {setTokensToLocalStorage} from "../utils";
import {googleSignIn} from "../services";


const GoogleAuthButton = ({text}) => {
    const navigate = useNavigate();

    const onSuccess = async(googleResponse) => {
        const response = await googleSignIn(googleResponse);
        setTokensToLocalStorage(response);

        navigate('/');
        // For now, until not implemented user handling
        window.location.reload();
    };

    const onError = (googleResponse) => {
        console.log(googleResponse);
    };

    const login = useGoogleLogin({
        onSuccess: response => onSuccess(response),
        onError: response => onError(response),
        flow: 'implicit'
    });

    return(
        <AuthButton text={text} onClick={() => login()}/>

    )
};


export default GoogleAuthButton;
