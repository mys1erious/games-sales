import React, {useState} from 'react';

import {TextField} from "@mui/material";

import {Button} from "features/core/components/Button";
import ReportBody from "features/reports/components/ReportBody";
import {setFormState} from "features/core/utils";
import {initReportHeaders} from "features/reports/constants";
import {postReport} from "features/reports/services";
import {createReportFile, HTMLDocumentToBlob} from "features/reports/reportGeneration";


const previewReport = (reportHeaders) => {
    const doc = createReportFile(reportHeaders);

    const win = window.open("", "Report",
        "toolbar=no,location=no,directories=no,status=no," +
        "menubar=no,scrollbars=yes,resizable=yes,width=1536," +
        "height=720,top="+(150)+",left="+(150));
    win.document.head.innerHTML = doc.head.innerHTML;
    win.document.body = doc.body;
};


const saveReport = async(reportHeaders) => {
    let doc = createReportFile(reportHeaders);
    doc = HTMLDocumentToBlob(doc);

    const data = new FormData();
    data.set('name', reportHeaders.name);
    data.set('report_body', doc)

    await postReport(data);
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
