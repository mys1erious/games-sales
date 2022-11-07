import React from "react";

import {Box, Typography} from "@mui/material";
import html2pdf from "html-to-pdf-js";

import {Button as BaseButton} from "features/core/components/Button";

import {DEFAULT_COLOR} from "../constants";
import {deleteReport, getReportBody} from "../services";
import ReportsListItemPreview from "./ReportsListItemPreview";


const Button = ({onClick, children, color}) => (
    <BaseButton onClick={onClick}  color={color}
                sx={{width: "170px", marginRight: "4px", marginBottom: "4px"}}>
        {children}
    </BaseButton>
);


const ReportsListItem = ({report, setReports}) => {

    const downloadFile = async() => {
        const response = await getReportBody(report.report);
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${report.name}.html`);
        document.body.appendChild(link);
        link.click();
    };

    const downloadPdf = async() => {
        const response = await getReportBody(report.report);
        const blob = new Blob([response.data]);
        const data = await blob.text();
        const options = {filename: `${report.name}.pdf`}
        html2pdf(data, options);
    };

    const handleDeleteReport = async() => {
        const res = await deleteReport(report.slug);
        if (res.status === 204)
            setReports(prev => prev.filter(
                rep => rep.slug !== report.slug
                )
            );
    };

    return(
        <Box marginBottom="20px" marginX="auto"
             paddingBottom="5px" width="60%" minWidth="300px"
             boxShadow={`0px 24px 8px -24px ${DEFAULT_COLOR}`}
        >
            <Typography variant="h4">{report.name}</Typography>
            <Typography variant="caption" color="gray" display="block">
                Created: {report.created}
            </Typography>
            <Button onClick={downloadFile}>
                Download as html
            </Button>
            <Button onClick={downloadPdf}>
                Download as pdf
            </Button>
            <Button onClick={handleDeleteReport}
                    color="error">
                Delete
            </Button>
            <ReportsListItemPreview url={report.report}/>
        </Box>
    );
};


export default ReportsListItem;
