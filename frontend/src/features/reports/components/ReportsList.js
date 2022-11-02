import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";

import ReportsListItem from "./ReportsListItem";
import {getReports} from "../../sales/services";


const ReportsList = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        getReports()
            .then(r => setReports(r.data));
    }, []);

    return(
        <Box>
            {reports.length > 0
                ? reports.map((report, index) => (
                    <ReportsListItem key={index} report={report}
                                     setReports={setReports}/>))
                : <div>You haven't created any reports yet...</div>
            }
        </Box>
    )
};


export default ReportsList;
