import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

import {AlertContext} from "features/core/AlertContext";

import {setUserDataToLocalStorage, User} from "../utils";
import {emailSignIn} from "../services";
import {UserContext} from "../UserContext";
import {initSignInFormData} from "../constants";
import AuthButton from "./AuthButton";
import AuthTextField from "./AuthTextField";
import AuthGoogleButton from "./AuthGoogleButton";
import AuthBaseForm from "./AuthBaseForm";


const SignInForm = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const {alert, setAlert} = useContext(AlertContext);

    const [formData, setFormData] = useState(initSignInFormData);

    const handleEmailSignIn = async(e) => {
        e.preventDefault();

        try {
            const response = await emailSignIn(formData.email, formData.password);

            setUserDataToLocalStorage({
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token
            });
            setUser(User({
                isLoggedIn: true
            }));

            setAlert({
                msg: 'Successfully signed in.',
                type: 'success'
            })
            navigate('/');
        }
        catch (e) {
            setAlert({
                ...alert,
                msg: 'Incorrect username or password.'
            })
        }
    };

    return(
        <>
        <AuthBaseForm onKeyDown={
            (e) => e.key === 'Enter' ? handleEmailSignIn(e) : null}
            textFields={[
                <AuthTextField formData={formData} setFormData={setFormData}
                               name="email" label="Email Address" />,
                <AuthTextField formData={formData} setFormData={setFormData}
                               name="password" label="Password" type="password"/>]}
            buttons={[
                <AuthButton onClick={handleEmailSignIn}>Sign In With Email</AuthButton>,
                <AuthGoogleButton>Sign In With Google</AuthGoogleButton>]}
        />
        </>
    );
};


export default SignInForm;
