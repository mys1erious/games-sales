import {Grid, Typography} from "@mui/material";

import AuthGrid from "features/auth/components/AuthGrid";
import SignInForm from "features/auth/components/SignInForm";
import AuthCaptionLink from "features/auth/components/AuthCaptionLink";


const SignIn = () => {
    return(
        <AuthGrid>
            <Grid item xs={12}>
                <Typography variant="h4">Sign In</Typography>
            </Grid>
            <Grid item xs={12}>
                <SignInForm />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="caption">
                    Dont have an account?
                    <AuthCaptionLink href="/signup/"> Sign Up.</AuthCaptionLink>
                </Typography>
            </Grid>
        </AuthGrid>
    );
};


export default SignIn;
