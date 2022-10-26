import React from "react";
import {FormControlLabel, Switch} from "@mui/material";


const ShowChartButton = ({isVisible, label, name, onChange}) => {
    return(
        <FormControlLabel
            control={
                <Switch checked={isVisible}
                        onChange={() => onChange(name)}
                />}
            label={label}
        />)
};


export default ShowChartButton;
