import React from "react";


// Decouple this file

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

const handleObjectStateChange = (input, formData, updateForm) => {
    updateForm({
        ...formData,
        ...input
    });
};

export const handleFormStateChange = (e, formData, updateFormData) => {
    updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
    });
};

export const triggerAlert = (r, alert, updateAlert) => {
    const tempAlertData = {
        isAlert: true,
        type: '',
        text: ''
    };
    setTempAlertData(r, tempAlertData);
    handleObjectStateChange(tempAlertData, alert, updateAlert);
};

export const setTokensToLocalStorage = (response) => {
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
};

export const removeTokensFromLocalStorage = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};
