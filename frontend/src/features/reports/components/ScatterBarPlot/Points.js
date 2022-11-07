import React from "react";

import {DEFAULT_COLOR} from "../../constants";
import {Point} from "../ScatterPlot/Points";
import {unslugify} from "features/core/utils";


const Points = ({data, xTitle, yTitle, xyTitle, yScale, xScale}) => (
    <g className="points">
        {Object.entries(data).map(([name, games]) =>
            Object.values(games).map((game, count) =>
                <Point key={count} color={DEFAULT_COLOR}
                       xVal={name} yVal={game[yTitle]}
                       xScale={xScale} yScale={yScale}
                       xTitle={xTitle} yTitle={yTitle}
                       text={`${game[xyTitle]} --> ` +
                           `${unslugify(xTitle)}: ${name}, ` +
                           `${unslugify(yTitle)}: ${game[yTitle]}`}
                />
            )
        )}
    </g>
);


export default Points;
