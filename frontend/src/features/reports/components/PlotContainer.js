import React from "react";
import {Typography} from "@mui/material";


const PlotContainer = ({title, children, border="1px solid gray"}) => (
    <div style={{fontSize: 11, border: border}}>
        <Typography align="center" variant="h6">{title}</Typography>
        <div>
            {children}
        </div>
    </div>
)


export default PlotContainer;
