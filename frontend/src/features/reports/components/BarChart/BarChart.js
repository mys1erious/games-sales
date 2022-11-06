import React, {useEffect, useState} from "react";
import * as d3 from "d3";

import PlotContainer from "../PlotContainer";
import Bars from "./Bars";
import XAxis from "./XAxis";
import YAxis from "./YAxis";


export const width = 640;
export const height = 400;
export const margin = {top: 20, right: 20, bottom: 20, left: 40};
export const innerWidth = width - margin.left - margin.right;
export const innerHeight = height - margin.top - margin.bottom;
export const viewBox = `0 0 ${width} ${height}`;
export const barMaxWidth = 55;


const BarChart = ({data, title, xTitle, yTitle, border}) => {
    const [barChart, setBarChart] = useState(<svg viewBox={viewBox}/>);

    const xScale = d3.scaleBand()
        .domain(data.map(d => d[xTitle]))
        .range([0, innerWidth])
        .paddingInner(0.05)
        .paddingOuter(0.05);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[yTitle])])
        .range([innerHeight, 0]);

    const generateBarChart = () => (
        <svg viewBox={viewBox}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <XAxis scale={xScale} height={innerHeight}/>
                <YAxis scale={yScale} height={innerHeight} width={innerWidth}/>
                <Bars data={data} maxWidth={barMaxWidth}
                      xTitle={xTitle} yTitle={yTitle}
                      yScale={yScale} xScale={xScale}
                      height={innerHeight}
                />
            </g>
        </svg>
    );

    useEffect(() => {
        setBarChart(generateBarChart());
        // eslint-disable-next-line
    }, [data]);

    return (
        <PlotContainer title={title} border={border}>
            {barChart}
        </PlotContainer>
    );
};


export default React.memo(BarChart);
