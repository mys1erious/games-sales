import React from "react";


export const initialAlertData = Object.freeze({
    isAlert: false,
    type: '',
    text: ''
});

const statusAlertTypeMap = {
        201: 'success',
        400: 'error',
        'other': 'info'
    };

const getAlertType = (r) => {
    let status;
    r.status in statusAlertTypeMap
        ? status = statusAlertTypeMap[r.status]
        : status = statusAlertTypeMap['other'];
    return status;
};

const parseErrorResponseData = (data) => {
    let text = '';
    for (let msgs of Object.values(data)){
        let msg = '';
        if (Array.isArray(msgs)){
            for (let subMsg of msgs){
                msg +=`${subMsg}<br/>`;
            }
        }
        else{
            msg = msgs;
        }
        text += msg;
    }

    let textArray = text.split('<br/>');
    for (let i=1; i < textArray.length; i+=2){
        textArray.splice(i, 0, <br key={i}/>);
    }
    return textArray;
};

const setTempAlertData = (r, tempAlertData) => {
    tempAlertData['type'] = getAlertType(r);
    tempAlertData['text'] = parseErrorResponseData(r.data);
}

const handleFormChange = (input, alertData, updateAlert) => {
        updateAlert({
            ...alertData,
            ...input
        });
    };

export const triggerAlert = (r, alert, updateAlert) => {
    const tempAlertData = {
        isAlert: true,
        type: '',
        text: ''
    };
    setTempAlertData(r, tempAlertData);
    handleFormChange(tempAlertData, alert, updateAlert);
};
