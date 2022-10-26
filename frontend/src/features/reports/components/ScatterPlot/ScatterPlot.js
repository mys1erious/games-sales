import React, {useEffect, useState} from "react";
import * as d3 from "d3";

import ChartContainer from "../ChartContainer";
import Points from "./Points";
import XAxis from "./XAxis";
import YAxis from "./YAxis";


const width = 640*1.5;
const height = 400*1.5;
const margin = {top: 20, right: 20, bottom: 20, left: 40};
export const innerWidth = width - margin.left - margin.right;
export const innerHeight = height - margin.top - margin.bottom;
const viewBox = `0 0 ${width} ${height}`;


const ScatterPlot = ({data, title, xTitle, yTitle}) => {
     const [scatterPlot, setScatterPlot] = useState(<svg viewBox={viewBox}/>);

    const xDomain = d3.extent(data[xTitle]);
    xDomain[0] -= xDomain[0] * 0.05;
    const xScale = d3.scaleLinear()
        .domain(xDomain)
        .range([0, innerWidth]);

    const yDomain = d3.extent(data[yTitle]);
    yDomain[0] -= yDomain[0] * 0.1;
    const yScale = d3.scaleLinear()
        .domain(yDomain)
        .range([innerHeight, 0]);

    const generateScatterPlot = () => (
        <svg viewBox={viewBox}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <XAxis xScale={xScale}/>
                <YAxis yScale={yScale}/>
                <Points data={data} xTitle={xTitle} yTitle={yTitle}
                      yScale={yScale} xScale={xScale}
                />
            </g>
        </svg>
    );

    useEffect(() => {
        setScatterPlot(generateScatterPlot());
        // eslint-disable-next-line
    }, [data]);

    return (
        <ChartContainer title={title}>
            {scatterPlot}
        </ChartContainer>
    );
};


export default ScatterPlot;
