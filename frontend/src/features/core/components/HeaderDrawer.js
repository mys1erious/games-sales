import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {Box, Drawer, FormControlLabel, IconButton, Switch} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import logoSrc from "assets/logo.svg";
import SalesSearchBar from "features/sales/components/SalesSearchBar";
import {UserContext} from "features/auth/UserContext";

import {Button} from "./Button";
import BaseLinkButton from "./LinkButton";
import Image from "./Image";


const LinkButton = ({to, startIcon, children}) => (
    <Box width="100%" textAlign="center"
         border="1px solid gray" borderRadius={10}
         marginBottom="4px"
    >
        <BaseLinkButton to={to} startIcon={startIcon}>
            {children}
        </BaseLinkButton>
    </Box>
);


const HeaderDrawer = ({isDarkTheme, changeTheme}) => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(
        () => setIsOpen(false),
        [navigate]
        );

    return (
        <>
        <Box whiteSpace="nowrap">
            <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setIsOpen(true)}>
                <MenuIcon />
            </IconButton>
            <SalesSearchBar/>
        </Box>
        <Drawer anchor="left" open={isOpen} sx={{position: "relative"}}
                onClose={() => setIsOpen(false)}>
            <Box padding="8px" height="48px">
                <Button onClick={() => setIsOpen(false)}>
                    <NavigateBeforeIcon/>
                </Button>
                <FormControlLabel
                    control={<Switch checked={isDarkTheme} onChange={changeTheme}/>}
                    label="Dark Mode" labelPlacement="start"/>
            </Box>
            <Box margin="8px">
                <Box minWidth="240px" width="25vw">
                    <LinkButton to="/" startIcon={
                        <Image src={logoSrc} alt="Logo" maxHeight={24} maxWidth={32}/>}>
                        Home
                    </LinkButton>
                    <LinkButton to="/sales/">Sales</LinkButton>
                    {user.isLoggedIn
                        ? <LinkButton to="/reports/">Reports</LinkButton>
                        : null
                    }
                </Box>
                <Box minWidth="240px" width="25vw" position="absolute" bottom={10}>
                    {user.isLoggedIn
                        ?
                        <LinkButton to="/sign-out/">Sign Out</LinkButton>
                        :
                        <>
                            <LinkButton to="/signin/">Sign In</LinkButton>
                            <LinkButton to="/signup/">Sign Up</LinkButton>
                        </>
                    }
                </Box>
            </Box>
        </Drawer>
        </>
    )
};


export default HeaderDrawer;
