import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";

import {
    Button,
    CssBaseline, Grid,
    Paper,
    Table,
    TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";

import axiosInstance from "../lib/axiosInstance";
import {handleFormStateChange} from "../features/core/utils";
import BarChart from "../features/reports/components/BarChart";


const ReportBuilder = () => {
    const initReportData = {
        name: '',
        remarks: ''
    };
    const initAnalysisData = {
        description: '',
        top_publishers: '',
        top_platforms: ''
    };

    const [searchParams, setSearchParams] = useSearchParams({});

    const [reportData, setReportData] = useState(initReportData);
    const [analysisData, setAnalysisData] = useState(initAnalysisData);
    const [tableHeaders, setTableHeaders] = useState([]);

    const getAnalysisData = async() => {
        return await axiosInstance.get(`/sale-analysis/?${searchParams}`);
    };

    useEffect(() => {
        getAnalysisData().then(r => {
            setAnalysisData(r.data);
        });
    }, []);

    const getTableHeaders = () => {
        if (analysisData?.description){
            const row = Object.values(analysisData.description)[0];
            const headers = Object.keys(row);
            setTableHeaders(headers);
        }
    };

    useEffect(() => {
        setTableHeaders(getTableHeaders);
    }, [analysisData]);


    const createReportFile = () => {
        const doc = document.implementation.createHTMLDocument('Report');

        // Copying MUI styles
        const styles = document.getElementsByTagName('style');
        for (const initStyle of styles) {
            const style = initStyle.cloneNode(true);
            doc.head.appendChild(style);
        }

        const reportContainer = doc.createElement('div');
        reportContainer.id = 'mainContainer';

        const reportName = doc.createElement('div');
        reportName.textContent = `Name: ${reportData.name}`;
        const reportRemarks = doc.createElement('div');
        reportRemarks.textContent = `Remarks: ${reportData.remarks}`;
        const reportViz = document.createElement('div');
        reportViz.innerHTML = document.getElementById('reportBody').innerHTML;
        reportViz.style.marginTop = "40px";

        reportContainer.appendChild(reportName);
        reportContainer.appendChild(reportRemarks);
        reportContainer.appendChild(reportViz);

        doc.body.appendChild(reportContainer);

        return doc;
    };

    const previewReport = () => {
        const doc = createReportFile();

        const win = window.open("", "Report",
            "toolbar=no,location=no,directories=no,status=no," +
            "menubar=no,scrollbars=yes,resizable=yes,width=1280," +
            "height=720,top="+(150)+",left="+(150));
        win.document.head.innerHTML = doc.head.innerHTML;
        win.document.body = doc.body;
    };

    const HTMLDocumentToBlob = (doc) => {
        return new Blob([doc.documentElement.innerHTML], {type: "text/plain"});
    };

    const postReport = async(data) => {
        const reportData = new FormData();
        for (const [key, val] of Object.entries(data))
            reportData.append(key, val);

        return await axiosInstance.post('/reports/', reportData,
            {headers: {'Content-Type': 'multipart/form-analysisData'}}
        );
    };

    const saveReport = async() => {
        let doc = createReportFile();
        doc = HTMLDocumentToBlob(doc);

        const data = {
            name: reportData.name,
            report_body: doc
        };

        await postReport(data);
    };

    return (
        <div style={{width: "90vw", margin: "auto"}}>
            <CssBaseline />

            <div style={{textAlign: "center", marginBottom: "15px", border: "1px solid gray"}}>
                <TextField variant="outlined" label="Name" name="name"
                           fullWidth sx={{marginBottom: "15px"}}
                           onChange={(e) => handleFormStateChange(e, reportData, setReportData)}
                />
                <TextField variant="outlined" label="Remarks" name="remarks"
                           fullWidth sx={{marginBottom: "15px"}}
                           multiline minRows={8}
                           onChange={(e) => handleFormStateChange(e, reportData, setReportData)}
                />
            </div>

            <div id="reportBody" >
            <Grid container rowSpacing={2} justifyContent="center"
                  border="1px solid gray">
                <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="report table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                {tableHeaders ?
                                    tableHeaders.map((header) => (
                                        <TableCell key={header}>{header}</TableCell>
                                    ))
                                    : null
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {analysisData?.description?
                                Object.entries(analysisData.description).map(([name, row]) => (
                                    <TableRow key={name}>
                                        <TableCell>{name}</TableCell>
                                        {Object.values(row).map((val, count) => (
                                            <TableCell key={count}>
                                                {Math.round((val + Number.EPSILON) * 100) / 100}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                                : null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
                <Grid item xs={6}>
                    {analysisData?
                        <BarChart data={analysisData.top_publishers} title="Top 10 Publishers"
                                  xTitle="publisher" yTitle="count"
                        />
                        : null
                    }
                </Grid>
                <Grid item xs={6}>
                    {analysisData?
                        <BarChart data={analysisData.top_platforms} title="Top 10 Platforms"
                                  xTitle="platform" yTitle="count"
                        />
                        : null
                    }
                </Grid>
            </Grid>
            </div>

            <div style={{marginTop: "10px", float: "right"}}>
                <Button sx={{border: "2px solid gray"}} color="primary" size="small"
                        onClick={() => previewReport()}
                >
                    Preview
                </Button>
                <Button sx={{border: "2px solid gray"}} color="success" size="small"
                        onClick={() => saveReport()}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};


export default ReportBuilder;
