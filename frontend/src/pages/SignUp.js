import React, {useState} from "react";
import AuthContainer from "../features/auth/components/AuthContainer";
import AuthMainGrid from "../features/auth/components/AuthMainGrid";
import {Grid, Typography} from "@mui/material";
import SignUpForm from "../features/auth/components/SignUpForm";


const SignUp = () => {
    const initialFormData = Object.freeze({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    const [formData, updateFormData] = useState(initialFormData);

    return(
        <AuthContainer content={
            <AuthMainGrid content={
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
