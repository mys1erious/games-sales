import React from "react";
import BarPieChartGridItem from "./BarPieChartGridItem";


const BarPieChartGridItems = ({charts, analysisData}) => (
    Object.entries(charts).map(([name, chart]) => (
        analysisData[chart.dataProp] && chart.isVisible
            ? <BarPieChartGridItem
                key={name}
                Chart={chart.component}
                data={analysisData[chart.dataProp]}
                title={chart.title}
                xTitle={chart.xTitle}
                yTitle={chart.yTitle}/>
            : null
        )
    )
);


export default BarPieChartGridItems;
