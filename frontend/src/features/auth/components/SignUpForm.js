import React, {useState} from "react";

import {Alert, Grid} from "@mui/material";
import AuthButton from "./AuthButton";
import AuthTextField from "./AuthTextField";

import {initialAlertData, triggerAlert} from "../utils";
import {GoogleOAuthProvider} from "@react-oauth/google";
import GoogleAuthButton from "./GoogleAuthButton";
import {signUp} from "../services";
import AuthBaseForm from "./AuthBaseForm";


const SignUpForm = ({formData, updateFormData}) => {
    const [alert, updateAlert] = useState(initialAlertData);

    const handleEmailSignUp = async(e) => {
        e.preventDefault();

        try {
            const response = await signUp(
                formData.username,
                formData.email,
                formData.password,
                formData.passwordConfirmation
            );
            triggerAlert(response, alert, updateAlert);
        }
        catch (e) {
            triggerAlert(e.response, alert, updateAlert);
        }

    };
    return(
        <React.Fragment>
            {
                alert.isAlert
                    ? <Alert severity={alert.type}>{alert.text}</Alert>
                    : null
            }
            <AuthBaseForm textFields={[
                <AuthTextField formData={formData} updateFormData={updateFormData}
                               name="email" label="Email Address" />,
                <AuthTextField formData={formData} updateFormData={updateFormData}
                               name="username" label="Username" />,
                <AuthTextField formData={formData} updateFormData={updateFormData}
                                   name="password" label="Password" type="password" />,
                <AuthTextField formData={formData} updateFormData={updateFormData}
                                   name="passwordConfirmation" label="Confirm Password" type="password" />
            ]} buttons={[
                <AuthButton text="Sign Up with Email" onClick={handleEmailSignUp}/>,
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
                    <GoogleAuthButton text={"Sign Up With Google"}/>
                </GoogleOAuthProvider>
            ]} />
        </React.Fragment>
    )
};


export default SignUpForm;
