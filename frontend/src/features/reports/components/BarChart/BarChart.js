import React, {useEffect, useState} from "react";
import * as d3 from "d3";

import ChartContainer from "../ChartContainer";
import XAxis from "./XAxis";
import Bars from "./Bars";
import YAxis from "./YAxis";


export const width = 640;
export const height = 400;
export const margin = {top: 20, right: 20, bottom: 20, left: 40};
export const innerWidth = width - margin.left - margin.right;
export const innerHeight = height - margin.top - margin.bottom;
export const viewBox = `0 0 ${width} ${height}`;
export const barMaxWidth = 55;


const BarChart = ({data, title, xTitle, yTitle}) => {
    const [barChart, setBarChart] = useState(<svg viewBox={viewBox}/>);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d[xTitle]))
        .range([0, innerWidth])
        .paddingInner(0.05)
        .paddingOuter(0.1);

    const xScale = d3.scaleLinear()
        .domain([d3.max(data, d => d[yTitle]), 0])
        .range([0, innerHeight]);

    const generateBarChart = () => (
        <svg viewBox={viewBox}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <XAxis xScale={xScale}/>
                <YAxis yScale={yScale}/>
                <Bars data={data} xTitle={xTitle} yTitle={yTitle}
                      yScale={yScale} xScale={xScale}
                />
            </g>
        </svg>
    );

    useEffect(() => {
        setBarChart(generateBarChart());
        // eslint-disable-next-line
    }, [data]);

    return (
        <ChartContainer title={title}>
            {barChart}
        </ChartContainer>
    );
};


export default React.memo(BarChart);
