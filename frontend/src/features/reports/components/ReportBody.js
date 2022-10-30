import React, {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {Box, Grid} from "@mui/material";

import {
    getGamesAnnuallyData,
    getGamesByFieldsData,
    getScoreData,
    getTopFieldsData
} from "../services";
import {DEFAULT_SALES_TYPE, initPlotVals, PLOTS, SALES_TYPES} from "../constants";
import ShowChartButtons from "./ShowChartButtons";
import DescribeTable from "./DescribeTable";
import {BarPieChartGridItems} from "./BarPieChart";
import {ScatterPlotGridItem} from "./ScatterPlot";
import {LineChartGridItem} from "./LineChart";
import {ScatterBarPlotGridItem} from "./ScatterBarPlot";
import DropDownButton from "features/core/components/DropDownButton";
import {unslugify} from "../../core/utils";


const ReportBody = () => {
    const [searchParams, setSearchParams] = useSearchParams({});

    const [plots, setPlots] = useState(initPlotVals);
    const [topFieldsData, setTopFieldsData] = useState({});
    const [scoreData, setScoreData] = useState({});
    const [gamesAnnuallyData, setGamesAnnuallyData] = useState({});
    const [gamesByFieldData, setGamesByFieldData] = useState({});
    const [salesType, setSalesType] = useState(DEFAULT_SALES_TYPE);

    useEffect(() => {
        getTopFieldsData(searchParams)
            .then(data => setTopFieldsData(data));
        getScoreData(searchParams)
            .then(r => setScoreData(r.data));
        getGamesAnnuallyData(searchParams)
            .then(r => setGamesAnnuallyData(r.data));
        getGamesByFieldsData(searchParams)
            .then(data => setGamesByFieldData(data));
    }, [searchParams]);

    const handleSalesType = (e) => {
        if (salesType !== e.target.value) {
            setSalesType(e.target.value);
            searchParams.set('sales_type', e.target.value);
            setSearchParams(searchParams);
        }
    };

    return(
        <Box border="1px solid gray">
            <DropDownButton labelText="Sales Type"
                            labelId="salesTypeLabel"
                            id="salesType"
                            curValue={salesType}
                            valuesList={SALES_TYPES}
                            reprValuesList={SALES_TYPES.map(
                                type => unslugify(type)
                            )}
                            onChange={handleSalesType}
            />
            {useMemo(() =>
                <ShowChartButtons charts={plots} setCharts={setPlots}/>,
                [plots])}

            <div id="reportBody">
                {useMemo(() =>
                        <DescribeTable />,
                    [searchParams])}

                <Grid container justifyContent="center">
                    {useMemo(() =>
                        <BarPieChartGridItems
                            plots={plots}
                            data={topFieldsData}
                        />, [plots, topFieldsData, searchParams])}

                    <LineChartGridItem
                        plot={plots[PLOTS.GAMES_ANNUALLY]}
                        data={gamesAnnuallyData}/>
                </Grid>
                <Grid container justifyContent="center">
                    <ScatterBarPlotGridItem
                        plot={plots[PLOTS.TOP_GAMES_BY_GENRE]}
                        data={gamesByFieldData}
                    />
                    <ScatterBarPlotGridItem
                        plot={plots[PLOTS.TOP_GAMES_BY_PLATFORM]}
                        data={gamesByFieldData}
                    />
                </Grid>
                <Grid container justifyContent="center">
                    <ScatterPlotGridItem
                        plot={plots[PLOTS.SCORE_CORRELATION]}
                        data={scoreData}
                    />
                </Grid>
            </div>
        </Box>
    );
};


export default React.memo(ReportBody);
