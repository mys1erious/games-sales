import React, {useContext, useState} from 'react';

import {Box, TextField} from "@mui/material";

import {Button} from "features/core/components/Button";
import Alert from "features/core/components/Alert";
import ReportBody from "features/reports/components/ReportBody";
import {setFormState} from "features/core/utils";
import {initReportHeaders} from "features/reports/constants";
import {postReport} from "features/reports/services";
import {createReportFile, HTMLDocumentToBlob} from "features/reports/reportGeneration";
import {AlertContext} from "../features/core/AlertContext";


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

    return await postReport(data);
};


const ReportBuilder = () => {
    const [reportHeaders, setReportHeaders] = useState(initReportHeaders);
    const {alert, setAlert} = useContext(AlertContext);
    
    const handleSave = async() => {
        try{
            await saveReport(reportHeaders);
            setAlert({
                msg: 'Report has been saved.',
                type: 'success'
            })
        } catch (e) {
            if (e.response.status === 401)
                setAlert({
                    ...alert,
                    msg: 'You need to be Signed In to save the report.'
                })
            else if (e.response.status === 400){
                console.log(e.response.data)
                const fields = e.response.data;
                const msg = parseResponseErrors(fields);
                setAlert({
                    ...alert,
                    msg: msg
                })
            }
        }
    };

    const parseResponseErrors = (fields) => {
        let msg = '';
        for (const [field, value] of Object.entries(fields)) {
            if (field === 'name') msg = 'You need to enter a report name.';
            else msg = value;
        }
        return msg;
    };

    return (
        <>
        <Box padding="10px 20px 10px 20px" marginBottom="40px">
            <Box textAlign="center" marginBottom="15px" paddingTop="10px">
                <TextField variant="outlined" label="Name" name="name"
                           fullWidth sx={{marginBottom: "15px"}}
                           onChange={(e) => setFormState(e, reportHeaders, setReportHeaders)}
                />
                <TextField variant="outlined" label="Remarks" name="remarks"
                           fullWidth sx={{marginBottom: "15px"}}
                           multiline minRows={8}
                           onChange={(e) => setFormState(e, reportHeaders, setReportHeaders)}
                />
            </Box>

            <ReportBody />

            <Box marginTop="10px" sx={{float: "right"}}>
                <Button onClick={() => previewReport(reportHeaders)}>
                    Preview
                </Button>
                <Button color="success" onClick={handleSave}>
                    Save
                </Button>
            </Box>
        </Box>
        </>
    );
};


export default ReportBuilder;
