import React, {useState} from 'react';

import {TextField} from "@mui/material";

import {Button} from "features/core/components/Button";
import ReportBody from "features/reports/components/ReportBody";
import {initReportHeaders} from "features/reports/constants";
import {postReport} from "features/reports/services";
import {setFormState} from "../features/core/utils";


const createReportFile = (reportHeaders) => {
    const doc = document.implementation.createHTMLDocument('Report');
    copyMuiStyles(doc);
    setHtmlReportData(doc, reportHeaders);
    return doc;
};

const copyMuiStyles = (doc) => {
    const styles = document.getElementsByTagName('style');
    for (const initStyle of styles) {
        const style = initStyle.cloneNode(true);
        doc.head.appendChild(style);
    }
};

const createReportHeader = (doc, reportHeaders, field, fieldRepr) => {
    const reportField = doc.createElement('div');
    reportField.textContent = `${fieldRepr}: ${reportHeaders[field]}`;
    return reportField;
};

const getReportBody = () => {
    const reportBody = document.createElement('div');
    reportBody.innerHTML = document.getElementById('reportBody').innerHTML;
    reportBody.style.marginTop = "40px";
    return reportBody;
};

const setHtmlReportData = (doc, reportHeaders) => {
    const reportContainer = doc.createElement('div');

    reportContainer.appendChild(createReportHeader(
        doc, reportHeaders, 'name', 'Name')
    );
    reportContainer.appendChild(createReportHeader(
        doc, reportHeaders, 'remarks', 'Remarks')
    );
    reportContainer.appendChild(getReportBody());

    doc.body.appendChild(reportContainer);
};

const previewReport = (reportHeaders) => {
    const doc = createReportFile(reportHeaders);

    const win = window.open("", "Report",
        "toolbar=no,location=no,directories=no,status=no," +
        "menubar=no,scrollbars=yes,resizable=yes,width=1280," +
        "height=720,top="+(150)+",left="+(150));
    win.document.head.innerHTML = doc.head.innerHTML;
    win.document.body = doc.body;
};

const HTMLDocumentToBlob = (doc) => (
    new Blob(
        [doc.documentElement.innerHTML],
        {type: "text/plain"})
);

const saveReport = async(reportHeaders) => {
    let doc = createReportFile(reportHeaders);
    doc = HTMLDocumentToBlob(doc);

    const data = new FormData();
    data.set('name', reportHeaders.name);
    data.set('report_body', doc)

    // Make an Alert
    try {
        await postReport(data);
        console.log('created');
    } catch (e) {
        console.log(e.response)
    }
};


const ReportBuilder = () => {
    const [reportHeaders, setReportHeaders] = useState(initReportHeaders);

    return (
        <>
        <div style={{
            textAlign: "center",
            marginBottom: "15px",
            paddingTop: "10px"
        }}>
            <TextField variant="outlined" label="Name" name="name"
                       fullWidth sx={{marginBottom: "15px"}}
                       onChange={(e) => setFormState(e, reportHeaders, setReportHeaders)}
            />
            <TextField variant="outlined" label="Remarks" name="remarks"
                       fullWidth sx={{marginBottom: "15px"}}
                       multiline minRows={8}
                       onChange={(e) => setFormState(e, reportHeaders, setReportHeaders)}
            />
        </div>

        <ReportBody />

        <div style={{marginTop: "10px", float: "right"}}>
            <Button onClick={() => previewReport(reportHeaders)}>
                Preview
            </Button>
            <Button color="success" onClick={() => saveReport(reportHeaders)}>
                Save
            </Button>
        </div>
        </>
    );
};


export default ReportBuilder;
