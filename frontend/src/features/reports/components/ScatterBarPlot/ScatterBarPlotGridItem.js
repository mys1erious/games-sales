import React from "react";
import ScatterBarPlot from "./ScatterBarPlot";
import {Grid} from "@mui/material";


const ScatterBarPlotGridItem = ({plot, data}) => {

    return (
        data[plot.xTitle] &&
        plot.isVisible
            ?
            <Grid item xs={12} md={9} xl={6}>
                <ScatterBarPlot data={data[plot.xTitle]}
                                title={plot.title}
                                xTitle={plot.xTitle}
                                yTitle={plot.yTitle}
                                xyTitle={plot.xyTitle}
                />
            </Grid>
            : null
    );
};


export default ScatterBarPlotGridItem;
