import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {removeUserDataFromLocalStorage, User} from "features/auth/utils";
import {signOut} from "features/auth/services";
import {UserContext} from "features/auth/UserContext";


const SignOut = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    const handleSignOut = async() => {
        await signOut();

        removeUserDataFromLocalStorage();
        setUser(User({}));

        navigate('/signin/');
    };

    useEffect(() => {
        handleSignOut();
    }, []);

    return(
        <div>Signing Out...</div>
    )
}


export default SignOut;
