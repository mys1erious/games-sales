import {Grid} from "@mui/material";
import React from "react";

const BarPieChartGridItem = ({Chart, data, title, xTitle, yTitle}) => (
    <Grid item xs={12} md={6} xl={4}>
        <Chart data={data} title={title} xTitle={xTitle} yTitle={yTitle}/>
    </Grid>
)


export default BarPieChartGridItem;
