import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../../lib/axiosInstance";
import {Alert, Grid} from "@mui/material";
import AuthButton from "./AuthButton";
import AuthTextField from "./AuthTextField";
import {initialAlertData, triggerAlert} from "../utils";
import {GoogleOAuthProvider} from "@react-oauth/google";
import GoogleAuthButton from "./GoogleAuthButton";

const SignInForm = ({formData, updateFormData}) => {
    const navigate = useNavigate();

    const [alert, updateAlert] = useState(initialAlertData);

    const handleEmailSignIn = async(e) => {
        e.preventDefault();
        axiosInstance.defaults.headers['Authorization'] = null;

        try {
            const response = await axiosInstance.post('/auth/token/',
                {
                    username: formData.email,
                    password: formData.password,
                    grant_type: 'password',
                    client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
                    client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET
                });

            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);

            navigate('/');
            // For now, until not implemented user handling
            window.location.reload();
        }
        catch (e) {
            triggerAlert(e.response, alert, updateAlert);
        }
    };

    // Rework alerts to be self-contained to not create data for em in each component u need
    return(
        <React.Fragment>
            {
                alert.isAlert
                    ? <Alert severity={alert.type}>{alert.text}</Alert>
                    : null
            }
        <form noValidate>
            <Grid item xs={12} container spacing={1}>
                <Grid item xs={12}>
                    <AuthTextField
                        formData={formData} updateFormData={updateFormData}
                        name={"email"} label={"Email Address"}/>
                </Grid>
                <Grid item xs={12}>
                    <AuthTextField
                        formData={formData} updateFormData={updateFormData}
                        name={"password"} label={"Password"} type={"password"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AuthButton text={"Sign In With Email"} onClick={handleEmailSignIn} />
                </Grid>
                <Grid item xs={12}>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
                        <GoogleAuthButton text={"Sign In With Google"} />
                    </GoogleOAuthProvider>
                </Grid>
            </Grid>
        </form>
        </React.Fragment>
    );
};


export default SignInForm;
