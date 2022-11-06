import React, {useContext, useState} from "react";

import {
    AppBar, Toolbar, Typography,
    FormControlLabel, Switch, useTheme, useMediaQuery, Box
} from "@mui/material";

import SalesSearchBar from "features/sales/components/SalesSearchBar";
import {UserContext} from "features/auth/UserContext";

import LinkButton from "./LinkButton";
import Image from "./Image";

import logoSrc from "assets/logo.svg";
import HeaderDrawer from "./HeaderDrawer";



const Header = ({isDarkTheme, setIsDarkTheme}) => {
    const changeTheme = () => {
        setIsDarkTheme(currTheme => !currTheme);
    };
    const {user} = useContext(UserContext);

    const theme = useTheme();
    const showDrawer = useMediaQuery(theme.breakpoints.down('md'));

    const DefaultView = () => (
        <>
        <Typography variant="h6" color="inherit">
            <LinkButton to="/" startIcon={
                <Image src={logoSrc} alt="Logo" maxHeight={24} maxWidth={32}/>}>
                Home
            </LinkButton>
            <LinkButton to="/sales/">Sales</LinkButton>
            {user.isLoggedIn
                ? <LinkButton to="/reports/">Reports</LinkButton>
                : null
            }
            <SalesSearchBar/>
        </Typography>
        <Typography variant="h6" color="inherit">
            <FormControlLabel
                control={<Switch checked={isDarkTheme} onChange={changeTheme}/>}
                label="Dark Mode" labelPlacement="start"/>
            {user.isLoggedIn
                ?
                <LinkButton to="/sign-out/">Sign Out</LinkButton>
                :
                <>
                    <LinkButton to="/signin/">Sign In</LinkButton>
                    <LinkButton to="/signup/">Sign Up</LinkButton>
                </>
            }
        </Typography>
        </>
    );

    return (
        <header style={{opacity: 0.7}}>
            <AppBar position="sticky" color="default" elevation={0}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                {showDrawer
                    ? <HeaderDrawer isDarkTheme={isDarkTheme}
                                    changeTheme={changeTheme}/>
                    : <DefaultView />
                }
            </Toolbar>
            </AppBar>
        </header>
    )
};


export default Header;
