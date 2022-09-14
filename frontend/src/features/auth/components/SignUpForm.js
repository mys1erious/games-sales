import React, {useState} from "react";

import {Alert, Grid} from "@mui/material";
import AuthButton from "./AuthButton";
import AuthTextField from "./AuthTextField";

import axiosInstance from "../../../lib/axiosInstance";
import {initialAlertData, triggerAlert} from "../utils";


const SignUpForm = ({formData, updateFormData}) => {
    const [alert, updateAlert] = useState(initialAlertData);

    const handleEmailSignUp = async(e) => {
        e.preventDefault();
        axiosInstance.defaults.headers['Authorization'] = null;
        axiosInstance.defaults.timeout = 10000;

        try {
            const response = await axiosInstance.post('/auth/signup/', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.passwordConfirmation
            });
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
            <form noValidate style={{marginTop: "20px"}}>
                <Grid item xs={12} container spacing={1}>
                    <Grid item xs={12}>
                        <AuthTextField
                            formData={formData} updateFormData={updateFormData}
                            name="email" label="Email Address"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AuthTextField
                            formData={formData} updateFormData={updateFormData}
                            name="username" label="Username"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AuthTextField
                            formData={formData} updateFormData={updateFormData}
                            name="password" label="Password" type="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AuthTextField
                            formData={formData} updateFormData={updateFormData}
                            name="passwordConfirmation" label="Confirm Password" type="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AuthButton
                            text="Sign Up with Email"
                            onClick={handleEmailSignUp}
                        />
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
};


export default SignUpForm;
