import React from "react";
import LineChart from "./LineChart";
import {Grid} from "@mui/material";


const LineChartGridItem = ({plot, data}) => {
    return (
        data.length > 0 &&
        plot.isVisible
            ?
            <Grid item xs={12} xl={8}>
                <LineChart data={data}
                           title={plot.title}
                           xTitle={plot.xTitle}
                           yTitle={plot.yTitle}/>
            </Grid>
            : null
    );
};


export default LineChartGridItem;
