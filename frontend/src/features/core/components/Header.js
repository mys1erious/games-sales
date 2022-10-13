import React, {useContext, useMemo} from "react";

import {
    AppBar, Toolbar, Typography,
    FormControlLabel, Switch
} from "@mui/material";

import SalesSearchBar from "features/sales/components/SalesSearchBar";
import {UserContext} from "features/auth/UserContext";

import LinkButton from "./LinkButton";
import Image from "./Image";

import logoSrc from "assets/logo.svg";


const Header = ({isDarkTheme, setIsDarkTheme}) => {
    const changeTheme = () => {
        setIsDarkTheme(currTheme => !currTheme);
    };
    const {user} = useContext(UserContext);

    return (
        <header>
        <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar sx={{justifyContent: "space-between"}}>
            <Typography variant="h6" color="inherit">
                <LinkButton to="/" startIcon={
                    <Image src={logoSrc} alt="Logo" maxHeight={24} maxWidth={32}/>
                }>
                    Home
                </LinkButton>
                <LinkButton to="/sales/">Sales</LinkButton>
                <LinkButton to="/reports/">Reports</LinkButton>
                <SalesSearchBar />
            </Typography>

            <Typography variant="h6" color="inherit">
                <FormControlLabel
                    control={ <Switch checked={isDarkTheme} onChange={changeTheme} /> }
                    label="Dark Mode" labelPlacement="start"/>
                {user.isLoggedIn
                    ?
                    <>
                        <LinkButton to="/profile/">Profile</LinkButton>
                        <LinkButton to="/sign-out/">Sign Out</LinkButton>
                    </>
                    :
                    <>
                        <LinkButton to="/signin/">Sign In</LinkButton>
                        <LinkButton to="/signup/">Sign Up</LinkButton>
                    </>
                }
            </Typography>
        </Toolbar>
        </AppBar>
        </header>
    )
};


export default Header;
