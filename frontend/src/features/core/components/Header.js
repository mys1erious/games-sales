import React, {useEffect, useState} from "react";

import "../css/Header.css";
import { ReactComponent as Logo } from "../../../assets/logo.svg";


import {
    AppBar,
    CssBaseline, FormControlLabel, Switch,
    Toolbar,
    Typography
} from "@mui/material";

import { BaseButton as Button } from "./BaseButton";
import SalesSearchBar from "../../sales/components/SalesSearchBar";



const Header = ({isDarkTheme, setIsDarkTheme}) => {
    const [searchText, setSearchText] = useState('');

    const changeTheme = () => {
        setIsDarkTheme(currTheme => !currTheme);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position={"sticky"} color={"default"} elevation={0}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <Typography variant={"h6"} color={"inherit"}>
                        <Button to={"/"} text={"Home"}
                                startIcon={<Logo className="logo" />}
                        />
                        <Button to={"/sales/"} text={"Sales"} />
                        <Button to={"#"} text={"Reports"} />
                        <SalesSearchBar searchText={searchText} setSearchText={setSearchText} />
                    </Typography>
                    <Typography variant={"h6"} color={"inherit"}>
                        <FormControlLabel
                            control={ <Switch checked={isDarkTheme} onChange={changeTheme} /> }
                            label={"Dark Mode"} labelPlacement={"start"}/>
                        {
                            localStorage.getItem('access_token') !== null
                                ?
                                <React.Fragment>
                                    <Button to={"/profile/"} text={"Profile"} />
                                    <Button to={"/sign-out/"} text={"Sign Out"} />
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Button to={"/signin/"} text={"Sign In"} />
                                    <Button to={"/signup/"} text={"Sign Up"} />
                                </React.Fragment>
                        }
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
};


export default Header;
