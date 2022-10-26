import React from "react";
import {Grid} from "@mui/material";
import {PLOT_BREAKPOINTS} from "../constants";


const PlotGridItem = ({Plot, data, title, xTitle, yTitle}) => {
    const breakpoints = PLOT_BREAKPOINTS[Plot];
    const [xs, md, xl] = [
        breakpoints.xs,
        breakpoints.md,
        breakpoints.xl
    ];

    return (
        <Grid item xs={xs} md={md} xl={xl}>
            <Plot data={data} title={title} xTitle={xTitle} yTitle={yTitle}/>
        </Grid>
    );
};


export default PlotGridItem;
