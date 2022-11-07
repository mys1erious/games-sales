import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {removeUserDataFromLocalStorage, User} from "features/auth/utils";
import {signOut} from "features/auth/services";
import {UserContext} from "features/auth/UserContext";
import {AlertContext} from "features/core/AlertContext";


const SignOut = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const {alert, setAlert} = useContext(AlertContext);

    useEffect(() => {
        if (!user.isLoggedIn)
            navigate('/signin/');
    }, [user]);

    const handleSignOut = async() => {
        try{
            await signOut();
            removeUserDataFromLocalStorage();
            setUser(User({}));
            setAlert({
                msg: 'Successfully signed out.',
                type: 'success'
            })
            navigate('/signin/');
        } catch (e) {
            setAlert({
                ...alert,
                msg: 'Error occurred during sign out. Try again.'
            })
        }
    };

    useEffect(() => {
        handleSignOut();
    }, []);

    return(
        <div>Signing Out...</div>
    )
}


export default SignOut;
