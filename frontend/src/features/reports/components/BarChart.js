import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import {max, scaleBand, scaleLinear} from "d3";


const BarChart = ({data, title, xTitle, yTitle}) => {
    const [barChart, setBarChart] = useState(<svg />);

    const width = 640;
    const height = 400;
    const margin = {top: 20, right: 20, bottom: 20, left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    for(let row of data){
        let title = row[xTitle]
        if (title.length > 10)
            row[xTitle] = title.substring(0, 7)+('...');
    }

    const nameScale = scaleBand()
        .domain(data.map(d => d[xTitle]))
        .range([0, innerWidth])
        .paddingInner(0.05)
        .paddingOuter(0.1);

    const valScale = scaleLinear()
        .domain([max(data, d => d[yTitle]), 0]) // -30 ? wut
        .range([0, innerHeight]);

    const generateBarChart = () => (
        <svg viewBox="0 0 640 400">
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {valScale.ticks().map(tickValue =>
                    <g key={tickValue} transform={`translate(${0}, ${valScale(tickValue)})`}>
                        <line x1={0} x2={innerWidth}
                              y1={0} y2={0}
                              stroke="#d9d9d9"/>
                        <text style={{textAnchor: "end", fill: "#635f5d"}} dy=".32em" x={-3}>
                            {tickValue}
                        </text>
                    </g>
                )}
                {nameScale.domain().map(tickValue =>
                    <text key={tickValue} style={{textAnchor: "middle", fill: "#635f5d"}}
                          x={nameScale(tickValue) + (nameScale.bandwidth()/2)}
                          y={innerHeight} dy="1em">
                        {tickValue}
                    </text>
                )}
                {data.map((d, count) => {
                    const x = nameScale(d[xTitle]);
                    const y = valScale(d[yTitle]);
                    const width = nameScale.bandwidth();
                    const height = innerHeight - valScale(d[yTitle]);

                    const textId = `${title.replaceAll(' ', '')}barText${count}`;

                    const onMouseOverRect = (e) => {
                        e.target.style.fill = '#1696d2';
                        document.getElementById(textId).style.display = "inline";
                    }
                    const onMouseOutRect = (e) => {
                        e.target.style.fill = '#46abdb';
                        document.getElementById(textId).style.display = "none";
                    }

                    return (
                        <g key={d[xTitle]}>
                            <rect x={x} y={y} width={width} height={height}
                                fill="#46abdb" stroke="#12719e"
                                onMouseOver={onMouseOverRect}
                                onMouseOut={onMouseOutRect} />
                            <text id={textId} x={x} y={y+(height/2)}
                                  fontSize={11} stroke="#000000"
                                  style={{display: "none"}}
                                  cursor="default">
                                {d[yTitle]}
                            </text>
                        </g>
                    );
                })}
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


export default BarChart;
