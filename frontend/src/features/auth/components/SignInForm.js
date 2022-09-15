import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthBaseButton from "./AuthBaseButton";
import AuthTextField from "./AuthTextField";
import {setTokensToLocalStorage} from "../utils";
import {GoogleOAuthProvider} from "@react-oauth/google";
import AuthGoogleButton from "./AuthGoogleButton";
import {emailSignIn} from "../services";
import AuthBaseForm from "./AuthBaseForm";
import AuthAlert, {initialAlertData, triggerAlert} from "./AuthAlert";

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
            {alert.isAlert ? <AuthAlert alert={alert}/> : null}
            <AuthBaseForm textFields={[
                 <AuthTextField formData={formData} updateFormData={updateFormData}
                                name={"email"} label={"Email Address"} />,
                <AuthTextField formData={formData} updateFormData={updateFormData}
                               name={"password"} label={"Password"} type={"password"} />,
            ]} buttons={[
                <AuthBaseButton text={"Sign In With Email"} onClick={handleEmailSignIn} />,
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
                    <AuthGoogleButton text={"Sign In With Google"} />
                </GoogleOAuthProvider>
            ]} />
        </React.Fragment>
    );
};


export default SignInForm;
