import React, {useState} from "react";

import AuthBaseButton from "./AuthBaseButton";
import AuthTextField from "./AuthTextField";

import AuthGoogleButton from "./AuthGoogleButton";
import {signUp} from "../services";
import AuthBaseForm from "./AuthBaseForm";
import AuthAlert, {initialAlertData, triggerAlert} from "./AuthAlert";


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
            {alert.isAlert ? <AuthAlert alert={alert} /> : null}
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
                <AuthBaseButton text="Sign Up with Email" onClick={handleEmailSignUp}/>,
                <AuthGoogleButton text={"Sign Up With Google"}/>
            ]} />
        </React.Fragment>
    )
};


export default SignUpForm;
