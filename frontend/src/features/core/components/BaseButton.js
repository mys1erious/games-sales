import React from "react";
import { Button } from "@mui/material";
import {NavLink} from "react-router-dom";


const BaseButton = (props) => {
    return(
        <Button
            component={NavLink} to={props.to} color={"inherit"} variant={"text"}
            startIcon={props.startIcon}
            style={props.style}
        >
            {props.text}
        </Button>
    )
};


export {BaseButton};
