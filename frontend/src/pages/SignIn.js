import React, {useState} from "react";

import AuthMainGrid from "../features/auth/components/AuthMainGrid";
import {Grid, Typography} from "@mui/material";
import SignInForm from "../features/auth/components/SignInForm";
import AuthContainer from "../features/auth/components/AuthContainer";


const SignIn = () => {
    const initialFormData = Object.freeze({
        email: '',
        password: ''
    });

    // Do i even need formData here or should i move it to SignInForm ?
    const [formData, updateFormData] = useState(initialFormData);

    return(
        <AuthContainer content={
            <AuthMainGrid content={
                <>
                <Grid item xs={12}>
                    <Typography variant="h4">Sign In</Typography>
                </Grid>
                <Grid item xs={12}>
                    <SignInForm formData={formData} updateFormData={updateFormData} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">
                        Dont have an account?
                        <a href="/signup/"> Sign Up.</a>
                    </Typography>
                </Grid>
                </>
            }>
            </AuthMainGrid>
        }>
        </AuthContainer>
    );
};


export default SignIn;
