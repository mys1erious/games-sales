import React, {useState} from 'react';

import {TextField} from "@mui/material";

import {setFormState} from "features/core/utils";
import {Button} from "features/core/components/Button";
import ReportBody from "features/reports/components/ReportBody";
import {initialReportData} from "features/reports/constants";
import {postReport} from "features/reports/services";


const createReportFile = (reportData) => {
    const doc = document.implementation.createHTMLDocument('Report');
    copyMuiStyles(doc);
    setHtmlReportData(doc, reportData);
    return doc;
};

const copyMuiStyles = (doc) => {
    const styles = document.getElementsByTagName('style');
    for (const initStyle of styles) {
        const style = initStyle.cloneNode(true);
        doc.head.appendChild(style);
    }
};

const setHtmlReportData = (doc, reportData) => {
    const reportContainer = doc.createElement('div');

    reportContainer.appendChild(buildReportHeader(
        doc, reportData, 'name', 'Name')
    );
    reportContainer.appendChild(buildReportHeader(
        doc, reportData, 'remarks', 'Remarks')
    );
    reportContainer.appendChild(getReportBody());

    doc.body.appendChild(reportContainer);
};

const buildReportHeader = (doc, reportData, field, fieldRepr) => {
    const reportField = doc.createElement('div');
    reportField.textContent = `${fieldRepr}: ${reportData[field]}`;
    return reportField;
};

const getReportBody = () => {
    const reportBody = document.createElement('div');
    reportBody.innerHTML = document.getElementById('reportBody').innerHTML;
    reportBody.style.marginTop = "40px";
    return reportBody;
};

const previewReport = (reportData) => {
    const doc = createReportFile(reportData);

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

const saveReport = async(reportData) => {
    let doc = createReportFile(reportData);
    doc = HTMLDocumentToBlob(doc);

    const data = new FormData();
    data.set('name', reportData.name);
    data.set('report_body', doc)

    // implement alert
    try {
        await postReport(data);
        console.log('created');
    } catch (e) {
        if (e.response.status === 400)
            console.log(e.response.data)
    }
};


const ReportBuilder = () => {
    const [reportData, setReportData] = useState(initialReportData);

    return (
        <div style={{width: "90vw", margin: "auto"}}>
            <div style={{textAlign: "center", border: "1px solid gray",
                marginBottom: "15px", paddingTop: "10px"}}>
                <TextField variant="outlined" label="Name" name="name"
                           fullWidth sx={{marginBottom: "15px"}}
                           onChange={(e) => setFormState(e, reportData, setReportData)}
                />
                <TextField variant="outlined" label="Remarks" name="remarks"
                           fullWidth sx={{marginBottom: "15px"}}
                           multiline minRows={8}
                           onChange={(e) => setFormState(e, reportData, setReportData)}
                />
            </div>

            <ReportBody />

            <div style={{marginTop: "10px", float: "right"}}>
                <Button onClick={() => previewReport(reportData)}>
                    Preview
                </Button>
                <Button color="success" onClick={() => saveReport(reportData)}>
                    Save
                </Button>
            </div>
        </div>
    );
};


export default ReportBuilder;
