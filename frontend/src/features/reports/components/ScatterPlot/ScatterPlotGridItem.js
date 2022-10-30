import React from "react";
import ScatterPlot from "./ScatterPlot";
import {Grid} from "@mui/material";


const ScatterPlotGridItem = ({plot, data}) => (
    Object.keys(data).length > 0 &&
    plot.isVisible
        ?
        <Grid item xs={12} md={9} xl={6}>
            <ScatterPlot data={data}
                         title={plot.title}
                         xTitle={plot.xTitle}
                         yTitle={plot.yTitle}
            />
        </Grid>
        : null
);


export default ScatterPlotGridItem;
