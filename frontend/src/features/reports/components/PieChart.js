import React, {useEffect, useState} from "react";
import {arc} from "d3";
import {Typography} from "@mui/material";


const width = 640;
const height = 400;
const centerX = width/2;
const centerY = height/2;
const arcWidth = 10;
const arcRadius = 190;


const PieChart = ({data}) => {
    const [pieChart, setPieChart] = useState(<svg/>);

    const arcObj = arc()
        .innerRadius(arcRadius)
        .outerRadius(arcRadius + arcWidth)
        .startAngle(0)
        .endAngle(Math.PI*2);

    const generatePieChart = () => (
        <svg viewBox="0 0 640 400">
            <g transform={`translate(${centerX}, ${centerY})`}>
                <path d={arcObj()} />
            </g>
        </svg>
    );
    useEffect(() => {
        setPieChart(generatePieChart());
    }, [data]);

    return(
        <div style={{fontSize: 11, border: "1px solid gray"}}>
            <Typography align="center" variant="h6">Title</Typography>
            <div>
                {pieChart}
            </div>
        </div>
    )
};


export default PieChart;
