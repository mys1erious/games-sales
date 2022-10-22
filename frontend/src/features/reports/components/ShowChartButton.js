import {FormControlLabel, Switch} from "@mui/material";
import React from "react";

const ShowChartButton = ({isVisible, label, name, onChange}) => (
    <FormControlLabel
        control={
            <Switch checked={isVisible}
                    onChange={() => onChange(name)}
            />}
        label={label}
    />
);


export default ShowChartButton;
