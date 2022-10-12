import React from "react";

import {Grid, Typography} from "@mui/material";

import AuthGrid from "features/auth/components/AuthGrid";
import SignUpForm from "features/auth/components/SignUpForm";
import AuthCaptionLink from "features/auth/components/AuthCaptionLink";


const SignUp = () => {
    return(
        <AuthGrid>
            <Grid item xs={12}>
                <Typography variant="h4">Sign Up</Typography>
            </Grid>
            <Grid item xs={12}>
                <SignUpForm />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="caption">
                    Have an account?
                    <AuthCaptionLink href="/signin/"> Sign In.</AuthCaptionLink>
                </Typography>
            </Grid>
        </AuthGrid>
    )
}


export default SignUp;
