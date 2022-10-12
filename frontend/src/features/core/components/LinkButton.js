import React from "react";
import {NavLink} from "react-router-dom";
import {Button as BaseButton} from "@mui/material";


const LinkButton = ({
    to,
    startIcon,
    color="inherit",
    variant="text",
    children
}) => (
    <BaseButton component={NavLink} to={to}
                color={color} variant={variant}
                startIcon={startIcon}>
            {children}
        </BaseButton>
);


export default LinkButton;
