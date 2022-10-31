import React, {useState} from 'react';

import {TextField} from "@mui/material";

import {Button} from "features/core/components/Button";
import ReportBody from "features/reports/components/ReportBody";
import {setFormState} from "features/core/utils";
import {initReportHeaders} from "features/reports/constants";
import {postReport} from "features/reports/services";


const createReportName = (doc, name) => {
    const nameElement = doc.createElement('div');
    nameElement.setAttribute(
        'style',
        'font-size: 24px;' +
        'margin-bottom: 20px;'
    )

    nameElement.textContent = name;
    return nameElement;
};

const createReportRemarks = (doc, remarks) => {
    const remarksElement = doc.createElement('div');
    remarksElement.setAttribute(
        'style',
        'font-size: 16px;'
    );

    remarksElement.textContent = `Remarks:\r\n${remarks}`;
    return remarksElement;
};

const createHeadersContainer = (doc, reportHeaders) => {
    const container = doc.createElement('div');
    container.setAttribute(
        'style',
        'text-align: center;'
    );

    const name = createReportName(doc, reportHeaders.name);
    container.appendChild(name);

    const remarks = createReportRemarks(doc, reportHeaders.remarks);
    container.appendChild(remarks);

    return container;
};

const createReportDate = (doc) => {
    const creationDate = doc.createElement('div');
    const date = new Date()
        .toString()
        .split(' ')
        .slice(0, 5)
        .join(' ');
    creationDate.textContent = `Creation date: ${date}`;
    return creationDate;
};

const createReportSearchParams = (doc) => {
    const searchParams = new URLSearchParams(window.location.search);
    const element = doc.createElement('div');
    element.setAttribute(
        'style',
        'white-space: pre;' +
        'margin-bottom: 10px;'
    )

    let str = 'Search params:\r\n';
    for (const param of searchParams)
        str += `- ${param[0]}=${param[1]}\r\n`

    element.textContent = str;
    return element;
};

const createReportSubHeadersContainer = (doc) => {
    const container = doc.createElement('div');
    container.setAttribute(
        'style',
        'margin-top: 30px;' +
        'font-size: 12px;' +
        'color: gray;' +
        'margin: 20px;'
    );

    container.appendChild(createReportSearchParams(doc));
    container.appendChild(createReportDate(doc));
    return container;
};

const getReportBody = () => {
    const reportBody = document.createElement('div');
    reportBody.innerHTML = document.getElementById('reportBody').innerHTML;
    return reportBody;
};

const reportCleanup =(doc) => {
    doc.getElementById('describeTableExpandBtn').remove();
}

const setHtmlReportData = (doc, reportHeaders) => {
    const reportContainer = doc.createElement('div');
    reportContainer.setAttribute(
        'style',
        'margin: 4%;' +
        'word-wrap: break-word;'
    );

    reportContainer.appendChild(createHeadersContainer(doc, reportHeaders));
    reportContainer.appendChild(createReportSubHeadersContainer(doc));
    reportContainer.appendChild(getReportBody());

    doc.body.appendChild(reportContainer);
    reportCleanup(doc);
};

const copyMuiStyles = (doc) => {
    const styles = document.getElementsByTagName('style');
    for (const initStyle of styles) {
        const style = initStyle.cloneNode(true);
        doc.head.appendChild(style);
    }
};

const createReportFile = (reportHeaders) => {
    const doc = document.implementation.createHTMLDocument('Report');
    copyMuiStyles(doc);
    setHtmlReportData(doc, reportHeaders);
    return doc;
};


const previewReport = (reportHeaders) => {
    const doc = createReportFile(reportHeaders);

    const win = window.open("", "Report",
        "toolbar=no,location=no,directories=no,status=no," +
        "menubar=no,scrollbars=yes,resizable=yes,width=1536," +
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
