import React, {useEffect, useState} from "react";

import AuthGrid from "../features/auth/components/AuthGrid";
import {Grid, Typography} from "@mui/material";
import SignInForm from "../features/auth/components/SignInForm";
import AuthContainer from "../features/auth/components/AuthContainer";


const SignIn = () => {
    const initialFormData = Object.freeze({
        email: '',
        password: ''
    });

    const [formData, updateFormData] = useState(initialFormData);

    return(
        <AuthContainer content={
            <AuthGrid content={
                <>
                <Grid item xs={12}>
                    <Typography variant="h4">Sign In</Typography>
                </Grid>
                <Grid item xs={12}>
                    <SignInForm formData={formData} updateFormData={updateFormData} />
                </Grid>
                <Grid item xs={12}>Social Auth Soon</Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">
                        Dont have an account?
                        <a href="/signup/"> Sign Up.</a>
                    </Typography>
                </Grid>
                </>
            }>
            </AuthGrid>
        }>
        </AuthContainer>
    );
};


export default SignIn;
