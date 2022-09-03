import React from "react";
import { NavLink } from "react-router-dom";

import "../css/Header.css";
import { ReactComponent as Logo } from "../../../assets/logo.svg";


import {
    AppBar,
    CssBaseline, FormControlLabel, Switch,
    Toolbar,
    Typography
} from "@mui/material";

import { BaseButton as Button } from "./BaseButton";


const Header = () => {

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position={"sticky"} color={"default"} elevation={0}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <Typography variant={"h6"} color={"inherit"}>
                        <Button to={"/"} text={"Home"}
                                startIcon={<Logo className="logo" />}
                        />
                        <Button to={"#"} text={"Sales"} />
                        <Button to={"#"} text={"Reports"} />
                    </Typography>
                    <Typography variant={"h6"} color={"inherit"}>
                        {
                            localStorage.getItem('access_token') !== null
                                ?
                                <React.Fragment>
                                    <Button to={"#"} text={"Profile"} />
                                    <Button to={"#"} text={"Sign Out"} />
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Button to={"#"} text={"Sign In"} />
                                    <Button to={"#"} text={"Sign Up"} />
                                </React.Fragment>
                        }
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
};


export default Header;
