import {NavLink} from "react-router-dom";
import React from "react";

const AuthCaptionLink = ({
    href,
    color="#1c78d3",
    children
}) => (
    <NavLink to={href} style={{color: color}}>
        {children}
    </NavLink>
);

export default AuthCaptionLink;
