import {Grid} from "@mui/material";

import DataLoadingItem from "features/core/components/DataLoadingItem";

import DescribeTable from "./DescribeTable";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import React, {useEffect, useState} from "react";
import {initialAnalysisData} from "../constants";
import {getAnalysisData} from "../services";
import {useSearchParams} from "react-router-dom";


const ReportBody = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [analysisData, setAnalysisData] = useState(initialAnalysisData);

    useEffect(() => {
        getAnalysisData(searchParams).then(r => {
            setAnalysisData(r.data);
        });
    }, []);

    if (!analysisData)
        return(<DataLoadingItem />);

    return(
        <div id="reportBody">
            <Grid container rowSpacing={2} justifyContent="center"
                  border="1px solid gray">
                <Grid item xs={12}>
                    {analysisData?.description
                        ? <DescribeTable data={analysisData.description} />
                        : <DataLoadingItem />
                    }
                </Grid>

                <Grid item xs={12} md={6} xl={4}> {/* Top Platforms */}
                    <BarChart data={analysisData.top_platforms} title="Top 10 Platforms"
                              xTitle="platform" yTitle="count"
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={4}> {/* Top Genres */}
                    <BarChart data={analysisData.top_genres} title="Top 10 Genres"
                              xTitle="genre" yTitle="count"
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={4}> {/* Top Publishers */}
                    <BarChart data={analysisData.top_publishers} title="Top 10 Publishers"
                              xTitle="publisher" yTitle="count"
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={4}> {/* Top Developers */}
                    <BarChart data={analysisData.top_developers} title="Top 10 Developers"
                              xTitle="developer" yTitle="count"
                    />
                </Grid>

                {/*For testing*/}
                <Grid item xs={12} md={6} xl={4}>
                    <PieChart data={analysisData.top_platforms} title="Top 10 Platforms"
                              xTitle="platform" yTitle="count"
                    />
                </Grid>
                <Grid item xs={12} md={6} xl={4}> {/* TEST */}
                    Developers will be here.
                </Grid>
            </Grid>
        </div>
    );
};


export default ReportBody;
