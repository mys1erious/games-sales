import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthContainer from "../features/auth/components/AuthContainer";
import AuthGrid from "../features/auth/components/AuthGrid";
import {Grid, Typography} from "@mui/material";
import SignUpForm from "../features/auth/components/SignUpForm";


const SignUp = () => {
    const navigate = useNavigate();

    const initialFormData = Object.freeze({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    const [formData, updateFormData] = useState(initialFormData);

    return(
        <AuthContainer content={
            <AuthGrid content={
                <>
                <Grid item xs={12}>
                    <Typography variant="h4">Sign Up</Typography>
                </Grid>
                <Grid item xs={12}>
                    <SignUpForm formData={formData} updateFormData={updateFormData}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="caption"
                    >
                        Have an account?
                        <a href="/signin/"> Sign In.</a>
                    </Typography>
                </Grid>
                </>
            }/>
        }>

        </AuthContainer>
    )
}


export default SignUp;
