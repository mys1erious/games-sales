import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import {removeTokensFromLocalStorage} from "../features/auth/utils";
import {signOut} from "../features/auth/services";


const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = async() => {
        await signOut();
        removeTokensFromLocalStorage();

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
