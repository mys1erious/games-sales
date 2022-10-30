import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import {signUp} from "../services";
import {initialSignUpFormData} from "../constants";
import AuthButton from "./AuthButton";
import AuthTextField from "./AuthTextField";
import AuthGoogleButton from "./AuthGoogleButton";
import AuthBaseForm from "./AuthBaseForm";
import AuthAlert from "./AuthAlert";


const SignUpForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialSignUpFormData);

    const handleEmailSignUp = async(e) => {
        e.preventDefault();

        try {
            const response = await signUp(
                formData.username,
                formData.email,
                formData.password,
                formData.passwordConfirmation
            );
            navigate('/signin/');
        }
        catch (e) {
            console.log(e.response)
        }

    };
    return(
        <>
        {alert.isAlert ? <AuthAlert alert={alert} /> : null}
        <AuthBaseForm onKeyDown={
            (e) => e.key === 'Enter' ? handleEmailSignUp(e) : null}
            textFields={[
            <AuthTextField formData={formData} setFormData={setFormData}
                           name="email" label="Email Address" />,
            <AuthTextField formData={formData} setFormData={setFormData}
                           name="username" label="Username" />,
            <AuthTextField formData={formData} setFormData={setFormData}
                           name="password" label="Password" type="password" />,
            <AuthTextField formData={formData} setFormData={setFormData}
                           name="passwordConfirmation" label="Confirm Password" type="password" />
        ]} buttons={[
            <AuthButton onClick={handleEmailSignUp}>Sign Up with Email</AuthButton>,
            <AuthGoogleButton>Sign Up With Google</AuthGoogleButton>
        ]} />
        </>
    )
};


export default SignUpForm;
