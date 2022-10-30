import React from "react";
import BarPieChart from "./BarPieChart";
import {Grid} from "@mui/material";


const BarPieChartGridItems = ({plots, data}) => (
    Object.entries(plots).map(([name, plot]) => (
        data[plot.xTitle] &&
        plot.component === BarPieChart &&
        plot.isVisible
            ?
            <Grid key={name} item xs={12} md={6} xl={4}>
                <BarPieChart data={data[plot.xTitle]}
                             title={plot.title}
                             xTitle={plot.xTitle}
                             yTitle={plot.yTitle}/>
            </Grid>
            : null
        )
    )
);


export default BarPieChartGridItems;
