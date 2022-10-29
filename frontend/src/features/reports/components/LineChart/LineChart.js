import React, {useEffect, useState} from "react";
import * as d3 from "d3";

import PlotContainer from "../PlotContainer";
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import Points from "./Points";


const width = 640*2 ;
const height = 400;
const margin = {top: 20, right: 20, bottom: 20, left: 40};
export const innerWidth = width - margin.left - margin.right;
export const innerHeight = height - margin.top - margin.bottom;
const viewBox = `0 0 ${width} ${height}`;


const LineChart = ({data, title, xTitle, yTitle}) => {
    const [lineChart, setLineChart] = useState(<svg viewBox={viewBox}/>);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d[xTitle]))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d[yTitle]))
        .range([innerHeight, 0]).nice();

    const generateLineChart = () => (
        <svg viewBox={viewBox}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <XAxis scale={xScale}/>
                <YAxis scale={yScale}/>
                <Points data={data} xTitle={xTitle} yTitle={yTitle}
                      yScale={yScale} xScale={xScale}
                />
            </g>
        </svg>
    );

    useEffect(() => {
        setLineChart(generateLineChart());
        // eslint-disable-next-line
    }, [data]);

    return (
        <PlotContainer title={title}>
            {lineChart}
        </PlotContainer>
    );
};


export default React.memo(LineChart);
