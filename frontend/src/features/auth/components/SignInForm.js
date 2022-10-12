import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

import {setUserDataToLocalStorage, User} from "../utils";
import {emailSignIn} from "../services";
import {UserContext} from "../UserContext";
import {initialSignInFormData, initialAlertData} from "../constants";
import AuthButton from "./AuthButton";
import AuthTextField from "./AuthTextField";
import AuthGoogleButton from "./AuthGoogleButton";
import AuthBaseForm from "./AuthBaseForm";
import AuthAlert, {triggerAlert} from "./AuthAlert";


const SignInForm = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(initialAlertData);
    const {setUser} = useContext(UserContext);

    const [formData, setFormData] = useState(initialSignInFormData);

    const handleEmailSignIn = async(e) => {
        e.preventDefault();

        try {
            const response = await emailSignIn(formData.email, formData.password);

            // Should make a request to profile endpoint and get username, email
            setUserDataToLocalStorage({
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token
            });
            setUser(User({
                email: '',
                isLoggedIn: true
            }));

            navigate('/');
        }
        catch (e) {
            triggerAlert(e.response, alert, setAlert);
        }
    };

    return(
        <>
        {alert.isAlert ? <AuthAlert alert={alert}/> : null}
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
