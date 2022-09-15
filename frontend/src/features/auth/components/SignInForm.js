import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Grid} from "@mui/material";
import AuthButton from "./AuthButton";
import AuthTextField from "./AuthTextField";
import {initialAlertData, setTokensToLocalStorage, triggerAlert} from "../utils";
import {GoogleOAuthProvider} from "@react-oauth/google";
import GoogleAuthButton from "./GoogleAuthButton";
import {emailSignIn} from "../services";
import AuthBaseForm from "./AuthBaseForm";

const SignInForm = ({formData, updateFormData}) => {
    const navigate = useNavigate();

    const [alert, updateAlert] = useState(initialAlertData);

    const handleEmailSignIn = async(e) => {
        e.preventDefault();

        try {
            const response = await emailSignIn(formData.email, formData.password);
            setTokensToLocalStorage(response);

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
            <AuthBaseForm textFields={[
                 <AuthTextField formData={formData} updateFormData={updateFormData}
                                name={"email"} label={"Email Address"} />,
                <AuthTextField formData={formData} updateFormData={updateFormData}
                               name={"password"} label={"Password"} type={"password"} />,
            ]} buttons={[
                <AuthButton text={"Sign In With Email"} onClick={handleEmailSignIn} />,
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
                    <GoogleAuthButton text={"Sign In With Google"} />
                </GoogleOAuthProvider>
            ]} />
        </React.Fragment>
    );
};


export default SignInForm;
