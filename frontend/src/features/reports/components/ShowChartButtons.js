import React from "react";
import {FormControlLabel, Grid, Switch} from "@mui/material";


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


const ShowChartButtons = ({charts, setCharts}) => {
    const onChange = (name) => {
        setCharts({
            ...charts,
            [name]: {
                ...charts[name],
                isVisible: !charts[name].isVisible
            }
        })
    };

    return (
        <Grid container justifyContent="center">
            {Object.entries(charts).map(([name, chart]) => (
                <Grid key={`${name}Switch`} item xs={12} sm={4} md={3} lg={2}>
                    <ShowChartButton isVisible={chart.isVisible}
                                     label={chart.title} name={name}
                                     onChange={onChange}
                    />
                </Grid>
            ))}
        </Grid>
    );
};


export default ShowChartButtons;
