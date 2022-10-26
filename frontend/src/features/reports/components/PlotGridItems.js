import React from "react";
import PlotGridItem from "./PlotGridItem";


const PlotGridItems = ({charts, analysisData}) => (
    Object.entries(charts).map(([name, chart]) => (
        analysisData[chart.dataProp] && chart.isVisible
            ? <PlotGridItem
                key={name}
                Plot={chart.component}
                data={analysisData[chart.dataProp]}
                title={chart.title}
                xTitle={chart.xTitle}
                yTitle={chart.yTitle}/>
            : null
        )
    )
);


export default PlotGridItems;
