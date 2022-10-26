import React from "react";
import {Typography} from "@mui/material";


const ChartContainer = ({title, children}) => (
    <div style={{fontSize: 11, border: "1px solid gray"}}>
        <Typography align="center" variant="h6">{title}</Typography>
        <div>
            {children}
        </div>
    </div>
)


export default ChartContainer;
