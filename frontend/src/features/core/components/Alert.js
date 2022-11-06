import React, {useContext, useEffect, useState} from "react";
import {Alert as BaseAlert} from "@mui/material";

import {AlertContext} from "../AlertContext";
import {initAlertData} from "../constants";


const Alert = () => {
    const {alert, setAlert} = useContext(AlertContext);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        const timeId = setTimeout(() => {
            setShow(false)
            setAlert(initAlertData);
        }, 3000);

        return () => clearTimeout(timeId);
    }, [alert]);

    if (!show || !alert.msg) return null;

    return (
        <BaseAlert severity={alert.type}
                   variant="filled"
                   sx={{
                       position: "fixed",
                       transform: "translateX(-50%)",
                       top: 0, left: "50%",
                       width: "50%",
                       minWidth: "360px",
                       zIndex: 1
                   }}
                   onClose={() => setAlert(initAlertData)}>
            {alert.msg}
        </BaseAlert>
    );
};


export default Alert;
