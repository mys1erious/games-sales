import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import {max, scaleBand, scaleLinear} from "d3";

import XAxis from "./XAxis";
import Bars from "./Bars";
import YAxis from "./YAxis";


export const margin = {top: 20, right: 20, bottom: 20, left: 40};
export const width = 640;
export const height = 400;
export const innerWidth = width - margin.left - margin.right;
export const innerHeight = height - margin.top - margin.bottom;


const BarChart = ({data, title, xTitle, yTitle}) => {
    console.log('RENDERED: bar chart: '+title)
    const [barChart, setBarChart] = useState(<svg/>);

    const nameScale = scaleBand()
        .domain(data.map(d => d[xTitle]))
        .range([0, innerWidth])
        .paddingInner(0.05)
        .paddingOuter(0.1);

    const valScale = scaleLinear()
        .domain([max(data, d => d[yTitle]), 0])
        .range([0, innerHeight]);

    const generateBarChart = () => (
        <svg viewBox="0 0 640 400">
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <XAxis valScale={valScale}/>
                <YAxis nameScale={nameScale}/>
                <Bars data={data} xTitle={xTitle} yTitle={yTitle}
                      nameScale={nameScale} valScale={valScale}
                />
            </g>
        </svg>
    );

    useEffect(() => {
        setBarChart(generateBarChart());
    }, [data]);

    return (
        <div style={{fontSize: 11, border: "1px solid gray"}}>
            <Typography align="center" variant="h6">{title}</Typography>
            <div>
                {barChart}
            </div>
        </div>
    )
};


export default React.memo(BarChart);
