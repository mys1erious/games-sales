import React, {useEffect, useState} from "react";
import * as d3 from "d3";

import PlotContainer from "../PlotContainer";
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

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d[xTitle]))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d[yTitle]))
        .range([innerHeight, 0])
        .nice();

    const generateScatterPlot = () => (
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
        setScatterPlot(generateScatterPlot());
        // eslint-disable-next-line
    }, [data]);

    return (
        <PlotContainer title={title}>
            {scatterPlot}
        </PlotContainer>
    );
};


export default React.memo(ScatterPlot);
