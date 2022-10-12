import React from 'react';
import {Alert} from "@mui/material";

import {setObjState} from "features/core/utils";
import {statusAlertTypeMap} from "../constants";

const getAlertType = (r) => {
    let status;
    r.status in statusAlertTypeMap
        ? status = statusAlertTypeMap[r.status]
        : status = statusAlertTypeMap['other'];
    return status;
};

const parseResponseData = (data) => {
    let text = '';
    for (let msgs of Object.values(data)){
        let msg = '';
        if (Array.isArray(msgs)){
            for (let subMsg of msgs)
                msg +=`${subMsg}<br/>`;
        }
        else msg = msgs;
        text += msg;
    }

    let textArray = text.split('<br/>');
    for (let i=1; i < textArray.length; i+=2)
        textArray.splice(i, 0, <br key={i}/>);

    return textArray;
};

const setAlertData = (r, tempAlertData) => {
    tempAlertData['type'] = getAlertType(r);
    tempAlertData['text'] = parseResponseData(r.data);
};


export const triggerAlert = (r, alert, setAlert) => {
    const alertData = {
        isAlert: true,
        type: '',
        text: ''
    };
    setAlertData(r, alertData);
    setObjState(alertData, alert, setAlert);
};


const AuthAlert = ({alert}) => (
    <Alert severity={alert.type}>{alert.text}</Alert>
);


export default AuthAlert;
