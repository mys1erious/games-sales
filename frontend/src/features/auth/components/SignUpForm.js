import React, {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

import {signUp} from "../services";
import {initialSignUpFormData, initSignUpFieldErrors} from "../constants";
import AuthButton from "./AuthButton";
import AuthTextField from "./AuthTextField";
import AuthGoogleButton from "./AuthGoogleButton";
import AuthBaseForm from "./AuthBaseForm";
import {AlertContext} from "../../core/AlertContext";


const SignUpForm = () => {
    const navigate = useNavigate();
    const {alert, setAlert} = useContext(AlertContext);

    const [formData, setFormData] = useState(initialSignUpFormData);
    const [fieldErrors, setFieldErrors] = useState(initSignUpFieldErrors);
    const [textFields, setTextFields] = useState([]);

    useEffect(() => {
        setTextFields([
            <AuthTextField formData={formData} setFormData={setFormData}
                           name="email" label="Email Address"
                           helperText={fieldErrors.email.msg}
                           error={fieldErrors.email.error}/>,
            <AuthTextField formData={formData} setFormData={setFormData}
                           name="username" label="Username"
                           helperText={fieldErrors.username.msg}
                           error={fieldErrors.username.error}/>,
            <AuthTextField formData={formData} setFormData={setFormData}
                           name="password" label="Password" type="password"
                           helperText={fieldErrors.password.msg}
                           error={fieldErrors.password.error}/>,
            <AuthTextField formData={formData} setFormData={setFormData}
                           name="passwordConfirmation" label="Confirm Password" type="password"
                           helperText={fieldErrors.password_confirmation.msg}
                           error={fieldErrors.password_confirmation.error}/>
        ])
    }, [formData, fieldErrors]);

    const handleEmailSignUp = async(e) => {
        e.preventDefault();

        try {
            await signUp(
                formData.username,
                formData.email,
                formData.password,
                formData.passwordConfirmation
            );
            setAlert({
                ...alert,
                msg: 'Confirmation link has been sent to your email.',
                type: "success"
            })
            navigate('/signin/');
        }
        catch (e) {
            const fields = e.response.data;
            setFieldErrors({
                ...initSignUpFieldErrors,
                ...parseFieldErrors(fields)
            });
        }

    };

    const parseFieldErrors = (fields) => {
        const fieldErrors = {};
        for (const field of Object.keys(fields)) {
            const msg = fields[field][0]
                .replace(/[\[\]',]/g, '');
            fieldErrors[field] = {
                msg: msg,
                error: true
            }
        }
        return fieldErrors;
    };

    return(
        <>
        <AuthBaseForm onKeyDown={
            (e) => e.key === 'Enter' ? handleEmailSignUp(e) : null}
            textFields={textFields} buttons={[
            <AuthButton onClick={handleEmailSignUp}>Sign Up with Email</AuthButton>,
            <AuthGoogleButton>Sign Up With Google</AuthGoogleButton>
        ]} />
        </>
    )
};


export default SignUpForm;
